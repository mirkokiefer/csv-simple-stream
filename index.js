
var iterators = require('async-iterators')
var createLineIterator = require('line-iterator')
var createStreamIterator = require('stream-iterator')
var fs = require('fs')

/*

The csv line parsing code is thankfully taken from @ridgerunner's excellent stackoverflow answer:
http://stackoverflow.com/a/8497474/1099982

The commented regular expression for readability:

re_valid = r"""
# Validate a CSV string having single, double or un-quoted values.
^                                   # Anchor to start of string.
\s*                                 # Allow whitespace before value.
(?:                                 # Group for value alternatives.
  '[^'\\]*(?:\\[\S\s][^'\\]*)*'     # Either Single quoted string,
| "[^"\\]*(?:\\[\S\s][^"\\]*)*"     # or Double quoted string,
| [^,'"\s\\]*(?:\s+[^,'"\s\\]+)*    # or Non-comma, non-quote stuff.
)                                   # End group of value alternatives.
\s*                                 # Allow whitespace after value.
(?:                                 # Zero or more additional values
  ,                                 # Values separated by a comma.
  \s*                               # Allow whitespace before value.
  (?:                               # Group for value alternatives.
    '[^'\\]*(?:\\[\S\s][^'\\]*)*'   # Either Single quoted string,
  | "[^"\\]*(?:\\[\S\s][^"\\]*)*"   # or Double quoted string,
  | [^,'"\s\\]*(?:\s+[^,'"\s\\]+)*  # or Non-comma, non-quote stuff.
  )                                 # End group of value alternatives.
  \s*                               # Allow whitespace after value.
)*                                  # Zero or more additional values
$                                   # Anchor to end of string.
"""

re_value = r"""
# Match one value in valid CSV string.
(?!\s*$)                            # Don't match empty last value.
\s*                                 # Strip whitespace before value.
(?:                                 # Group for value alternatives.
  '([^'\\]*(?:\\[\S\s][^'\\]*)*)'   # Either $1: Single quoted string,
| "([^"\\]*(?:\\[\S\s][^"\\]*)*)"   # or $2: Double quoted string,
| ([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)  # or $3: Non-comma, non-quote stuff.
)                                   # End group of value alternatives.
\s*                                 # Strip whitespace after value.
(?:,|$)                             # Field ends on comma or EOS.
"""

*/

var parseLine = function(text) {
  var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/
  var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null
  var a = [] // Initialize array to receive values.
  text.replace(re_value, // "Walk" the string using replace with callback.
    function(m0, m1, m2, m3) {
        // Remove backslash from \' in single quoted values.
        if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"))
        // Remove backslash from \" in double quoted values.
        else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'))
        else if (m3 !== undefined) a.push(m3)
        return '' // Return empty string.
    })
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push('')
  return a
}

var createCSVIteratorFromLines = function(lineIterator) {
  return iterators.map(lineIterator, function(err, text) {
    return parseLine(text)
  })
}

var createLineIteratorFromPath = function(path) {
  var fileStream = fs.createReadStream(path, {encoding: 'utf8'})
  var fileIterator = createStreamIterator(fileStream)
  return createLineIterator(fileIterator)
}

var createToObjectIterator = function(csvIterator) {
  var header = null
  var next = function(cb) {
    csvIterator.next(function(err, res) {
      if (err) return cb(err)
      if (res === undefined) return cb(null, undefined)

      if (!header) {
        header = res
        return next(cb)
      }

      var object = {}
      header.forEach(function(headline, i) {
        object[headline] = res[i]
      })
      cb(null, object)
    })
  }
  return {next: next}
}

var createCSVIterator = function(opts) {
  var lineIterator
  if (opts.lineIterator) lineIterator = opts.lineIterator
  if (opts.path) lineIterator = createLineIteratorFromPath(opts.path)
  var csvIterator = createCSVIteratorFromLines(lineIterator)
  if (opts.toObjects) csvIterator = createToObjectIterator(csvIterator)
  if (opts.from !== undefined || opts.to !== undefined) {
    csvIterator = iterators.range(csvIterator, {from: opts.from, to: opts.to})
  }
  return csvIterator
}

var createToCSVLinesIterator = function(iterator) {
  var next = function(cb) {
    iterator.next(function(err, array) {
      if (array === undefined) return cb(null, undefined)
      var mappedValues = array.map(function(each) {
        if (each.indexOf('"') > -1) {
          return '"' + each.replace(/\"/g, '\\"') + '"'
        } else {
          return each
        }
      })
      cb(null, mappedValues.join(',') + '\n')
    })
  }
  return {next: next}
}

module.exports = {
  fromCSV: createCSVIterator,
  toCSVLines: createToCSVLinesIterator
}
