
var assert = require('assert')
var csvIterator = require('../index')
var iterators = require('async-iterators')
var testData = require('./test-data/result')
var fs = require('fs')
var testFile = __dirname + '/test-data/input.csv'
var testFileData = fs.readFileSync(testFile, {encoding: 'utf8'})
var outputFile = __dirname + '/test-data/output.csv'

describe('csv-iterator', function() {
  it('should iterate over a csv file', function(done) {
    var iterator = csvIterator.fromCSV({path: testFile})
    iterators.toArray(iterator, function(err, res) {
      assert.deepEqual(res, testData.rawResult)
      done()
    })
  })
  it('should iterate over a limited range', function(done) {
    var iterator = csvIterator.fromCSV({path: testFile, from: 10, to: 19})
    iterators.toArray(iterator, function(err, res) {
      assert.deepEqual(res, testData.rawResult.slice(10, 20))
      done()
    })
  })
  it('should iterate and transform lines to objects', function(done) {
    var iterator = csvIterator.fromCSV({path: testFile, toObjects: true, to: 1})
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
  it('should create a csv lines iterator', function(done) {
    var iterator = csvIterator.fromCSV({path: testFile})
    var toCSVLinesIterator = csvIterator.toCSVLines(iterator)
    var writeStream = fs.createWriteStream(outputFile, {encoding: 'utf8'})
    iterators.toWritableStream(toCSVLinesIterator, writeStream, function(err) {
      writeStream.end(done)
      // assert.deepEqual(res.join(''), testFileData)
      // done()
    })
  })
})