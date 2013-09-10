
var streamUtils = require('simple-stream')
var createLineStream = require('line-simple-stream')
var fs = require('fs')
var EventEmitter = require('events').EventEmitter

var parseRows = require('./parse')
var formatRow = require('./format')

var parseLine = function(text) {
  var array = parseRows(text)[0]
  // ugly hotfix
  if (text[text.length-1] == ',') array.push('')
  return array
}

var createCSVStream = function(lineStream, events) {
  var arraysStream = streamUtils.map(lineStream, function(text) {
    return parseLine(text)
  })
  var lineIndex = -1
  var filteredStream = streamUtils.filter(arraysStream, function(array) {
    lineIndex++
    if (array === null) {
      events.emit('error', new Error('bad line at index ' + lineIndex))
      return false
    }
    return array.length > 0
  })
  return filteredStream
}

var createToObjectStream = function(csvStream) {
  var header = null
  var read = function(cb) {
    csvStream.read(function(err, res) {
      if (err) return cb(err)
      if (res === undefined) return cb(null, undefined)

      if (!header) {
        header = res
        return read(cb)
      }

      var object = {}
      header.forEach(function(headline, i) {
        object[headline] = res[i]
      })
      cb(null, object)
    })
  }
  return {read: read}
}

var fromFile = function(path, opts) {
  var fileStream = fs.createReadStream(path, {encoding: 'utf8'})
  var fileStream = streamUtils.fromReadableStream(fileStream)
  var lineStream = createLineStream(fileStream)
  return fromLines(lineStream, opts)
}

var fromLines = function(lineStream, opts) {
  opts = opts || {}
  var events = new EventEmitter
  var csvStream = createCSVStream(lineStream, events)
  if (opts.toObjects) csvStream = createToObjectStream(csvStream)
  if (opts.from !== undefined || opts.to !== undefined) {
    csvStream = streamUtils.range(csvStream, {from: opts.from, to: opts.to})
  }
  events.read = csvStream.read
  return events
}

var createObjectsToArrayStream = function(iterator, columns) {
  var headerWritten = false
  var firstRow
  var read = function(cb) {
    var writeObject = function(obj) {
      var array = columns.map(function(each) { return obj[each] })
      cb(null, array)
    }
    if (firstRow) {
      var obj = firstRow
      firstRow = null
      return writeObject(obj)
    }
    iterator.read(function(err, obj) {
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
  return {read: read}
}

var toLines = function(iterator, opts) {
  opts = opts || {}
  if (opts.objects) iterator = createObjectsToArrayStream(iterator, opts.columns)
  var read = function(cb) {
    iterator.read(function(err, array) {
      if (array === undefined) return cb(null, undefined)
      cb(null, formatRow(array) + '\n')
    })
  }
  return {read: read}
}

var toFile = function(iterator, path, opts, cb) {
  if (cb == undefined && opts.constructor == Function) {
    cb = opts
    opts = {}
  }
  var csvLines = toLines(iterator, opts)
  var writeStream = fs.createWriteStream(path)
  streamUtils.toWritableStream(csvLines, writeStream, opts.encoding || 'utf8')(function(err) {
    if (err) return cb(err)
    writeStream.end(cb)
  })
}

module.exports = {
  fromFile: fromFile,
  fromLines: fromLines,
  toLines: toLines,
  toFile: toFile
}
