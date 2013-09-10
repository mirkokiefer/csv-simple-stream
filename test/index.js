
var assert = require('assert')
var csvStream = require('../lib/index')
var streamUtils = require('simple-stream')
var testData = require('./test-data/result')
var fs = require('fs')
var testFile = __dirname + '/test-data/input.csv'
var testFileData = fs.readFileSync(testFile, {encoding: 'utf8'})
var outputFile = __dirname + '/test-data/output.csv'
var expectedOutputFile = __dirname + '/test-data/expected-output.csv'
var expectedOutput = fs.readFileSync(expectedOutputFile, {encoding: 'utf8'})
var badInputFile = __dirname + '/test-data/bad-input.csv'

describe('csv-stream', function() {
  it('should iterate over a csv file', function(done) {
    var stream = csvStream.fromFile(testFile)
    streamUtils.toArray(stream)(function(err, res) {
      assert.deepEqual(res, testData.rawResult)
      done()
    })
  })
  it('should iterate over a limited range', function(done) {
    var stream = csvStream.fromFile(testFile, {from: 10, to: 19})
    streamUtils.toArray(stream)(function(err, res) {
      assert.deepEqual(res, testData.rawResult.slice(10, 20))
      done()
    })
  })
  it('should iterate and transform lines to objects', function(done) {
    var stream = csvStream.fromFile(testFile, {toObjects: true, to: 1})
    streamUtils.toArray(stream)(function(err, res) {
      var expected = [{
        id: '20322051544',
        name: 'AB',
        date: '2000-01-01'
      }, {
        id: '28392898392,comma',
        name: 'CD',
        date: '2050-03-27'
      }]
      assert.deepEqual(res, expected)
      done()
    })
  })
  it('should create a csv lines stream from an array stream', function(done) {
    var stream = csvStream.fromFile(testFile)
    var toCSVLinesStream = csvStream.toLines(stream)
    var writeStream = fs.createWriteStream(outputFile, {encoding: 'utf8'})
    streamUtils.toWritableStream(toCSVLinesStream, writeStream)(function(err) {
      writeStream.end(function() {
        var output = fs.readFileSync(outputFile, {encoding: 'utf8'})
        fs.unlinkSync(outputFile)
        assert.deepEqual(output, expectedOutput)
        done()
      })
    })
  })
  it('should create a csv lines stream from an object stream', function(done) {
    var stream = csvStream.fromFile(testFile, {toObjects: true})
    var toCSVLinesStream = csvStream.toLines(stream, {objects: true})
    var writeStream = fs.createWriteStream(outputFile, {encoding: 'utf8'})
    streamUtils.toWritableStream(toCSVLinesStream, writeStream)(function(err) {
      writeStream.end(function() {
        var output = fs.readFileSync(outputFile, {encoding: 'utf8'})
        fs.unlinkSync(outputFile)
        assert.deepEqual(output, expectedOutput)
        done()
      })
    })
  })
  it('should check a bad csv file', function(done) {
    var stream = csvStream.fromFile(badInputFile)
    // var errorTriggered = false
    // stream.on('error', function(err) {
    //   assert.equal(err.message, 'bad line at index 3')
    //   errorTriggered = true
    // })
    streamUtils.toArray(stream)(function(err, res) {
      assert.deepEqual(res, testData.badResult)
      // assert.ok(errorTriggered)
      done()
    })
  })
  it('should write csv lines directly to file', function(done) {
    var stream = csvStream.fromFile(testFile, {toObjects: true})
    var toCSVLinesStream = csvStream.toFile(stream, outputFile, {objects: true})(function() {
      var output = fs.readFileSync(outputFile, {encoding: 'utf8'})
      fs.unlinkSync(outputFile)
      assert.deepEqual(output, expectedOutput)
      done()
    })
  })
})