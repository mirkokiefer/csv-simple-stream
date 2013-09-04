
var iterators = require('async-iterators')
var createLineIterator = require('line-iterator')
var fs = require('fs')
var EventEmitter = require('events').EventEmitter

var parseRows = require('./parse')
var formatRow = require('./format')

var parseLine = function(text) {
  var array = parseRows(text)[0]
  return array
}

var createCSVIterator = function(lineIterator, events) {
  var arraysIterator = iterators.map(lineIterator, function(err, text) {
    return parseLine(text)
  })
  var lineIndex = -1
  var filteredIterator = iterators.filter(arraysIterator, function(err, array) {
    lineIndex++
    if (array === null) {
      events.emit('error', new Error('bad line at index ' + lineIndex))
      return false
    }
    return array.length > 0
  })
  return filteredIterator
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

var fromFile = function(path, opts) {
  var fileStream = fs.createReadStream(path, {encoding: 'utf8'})
  var fileIterator = iterators.fromReadableStream(fileStream)
  var lineIterator = createLineIterator(fileIterator)
  return fromLines(lineIterator, opts)
}

var fromLines = function(lineIterator, opts) {
  opts = opts || {}
  var events = new EventEmitter
  var csvIterator = createCSVIterator(lineIterator, events)
  if (opts.toObjects) csvIterator = createToObjectIterator(csvIterator)
  if (opts.from !== undefined || opts.to !== undefined) {
    csvIterator = iterators.range(csvIterator, {from: opts.from, to: opts.to})
  }
  events.next = csvIterator.next
  return events
}

var createObjectsToArrayIterator = function(iterator, columns) {
  var headerWritten = false
  var firstRow
  var next = function(cb) {
    var writeObject = function(obj) {
      var array = columns.map(function(each) { return obj[each] })
      cb(null, array)
    }
    if (firstRow) {
      var obj = firstRow
      firstRow = null
      return writeObject(obj)
    }
    iterator.next(function(err, obj) {
      if (obj === undefined) return cb(null, undefined)
      if (!headerWritten) {
        firstRow = obj
        columns = columns || Object.keys(obj)
        headerWritten = true
        return cb(null, columns)
      }
      writeObject(obj)
    })
  }
  return {next: next}
}

var toLines = function(iterator, opts) {
  opts = opts || {}
  if (opts.objects) iterator = createObjectsToArrayIterator(iterator, opts.columns)
  var next = function(cb) {
    iterator.next(function(err, array) {
      if (array === undefined) return cb(null, undefined)
      cb(null, formatRow(array) + '\n')
    })
  }
  return {next: next}
}

var toFile = function(iterator, path, opts, cb) {
  if (cb == undefined && opts.constructor == Function) {
    cb = opts
    opts = {}
  }
  var csvLines = toLines(iterator, opts)
  var writeStream = fs.createWriteStream(path)
  iterators.toWritableStream(csvLines, writeStream, opts.encoding || 'utf8', function() {
    writeStream.end(cb)
  })
}

module.exports = {
  fromFile: fromFile,
  fromLines: fromLines,
  toLines: toLines,
  toFile: toFile
}
