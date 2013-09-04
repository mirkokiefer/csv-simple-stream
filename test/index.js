
var assert = require('assert')
var csvIterator = require('../index')
var iterators = require('async-iterators')
var testData = require('./test-data/result')
var fs = require('fs')
var testFile = __dirname + '/test-data/input.csv'
var testFileData = fs.readFileSync(testFile, {encoding: 'utf8'})
var outputFile = __dirname + '/test-data/output.csv'
var expectedOutputFile = __dirname + '/test-data/expected-output.csv'
var expectedOutput = fs.readFileSync(expectedOutputFile, {encoding: 'utf8'})
var badInputFile = __dirname + '/test-data/bad-input.csv'

describe('csv-iterator', function() {
  it('should iterate over a csv file', function(done) {
    var iterator = csvIterator.fromFile(testFile)
    iterators.toArray(iterator, function(err, res) {
      assert.deepEqual(res, testData.rawResult)
      done()
    })
  })
  it('should iterate over a limited range', function(done) {
    var iterator = csvIterator.fromFile(testFile, {from: 10, to: 19})
    iterators.toArray(iterator, function(err, res) {
      assert.deepEqual(res, testData.rawResult.slice(10, 20))
      done()
    })
  })
  it('should iterate and transform lines to objects', function(done) {
    var iterator = csvIterator.fromFile(testFile, {toObjects: true, to: 1})
    iterators.toArray(iterator, function(err, res) {
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
  it('should create a csv lines iterator from an array iterator', function(done) {
    var iterator = csvIterator.fromFile(testFile)
    var toCSVLinesIterator = csvIterator.toLines(iterator)
    var writeStream = fs.createWriteStream(outputFile, {encoding: 'utf8'})
    iterators.toWritableStream(toCSVLinesIterator, writeStream, function(err) {
      writeStream.end(function() {
        var output = fs.readFileSync(outputFile, {encoding: 'utf8'})
        fs.unlinkSync(outputFile)
        assert.deepEqual(output, expectedOutput)
        done()
      })
    })
  })
  it('should create a csv lines iterator from an object iterator', function(done) {
    var iterator = csvIterator.fromFile(testFile, {toObjects: true})
    var toCSVLinesIterator = csvIterator.toLines(iterator, {objects: true})
    var writeStream = fs.createWriteStream(outputFile, {encoding: 'utf8'})
    iterators.toWritableStream(toCSVLinesIterator, writeStream, function(err) {
      writeStream.end(function() {
        var output = fs.readFileSync(outputFile, {encoding: 'utf8'})
        fs.unlinkSync(outputFile)
        assert.deepEqual(output, expectedOutput)
        done()
      })
    })
  })
  it('should check a bad csv file', function(done) {
    var iterator = csvIterator.fromFile(badInputFile)
    // var errorTriggered = false
    // iterator.on('error', function(err) {
    //   assert.equal(err.message, 'bad line at index 3')
    //   errorTriggered = true
    // })
    iterators.toArray(iterator, function(err, res) {
      assert.deepEqual(res, testData.badResult)
      // assert.ok(errorTriggered)
      done()
    })
  })
  it('should write csv lines directly to file', function(done) {
    var iterator = csvIterator.fromFile(testFile, {toObjects: true})
    var toCSVLinesIterator = csvIterator.toFile(iterator, outputFile, {objects: true}, function() {
      var output = fs.readFileSync(outputFile, {encoding: 'utf8'})
      fs.unlinkSync(outputFile)
      assert.deepEqual(output, expectedOutput)
      done()
    })
  })
})