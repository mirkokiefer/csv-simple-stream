
var assert = require('assert')
var fs = require('fs')
var createCSVIterator = require('../index').fromLineIterator
var createLineIterator = require('line-iterator')
var createStreamIterator = require('stream-iterator')
var iterators = require('async-iterators')
var testData = require('./test-data/result')

describe('csv-iterator', function() {
  it('should iterate over a csv file', function(done) {
    var testFile = __dirname + '/test-data/input.csv'
    var fileStream = fs.createReadStream(testFile, {encoding: 'utf8'})
    var fileIterator = createStreamIterator(fileStream)
    var lineIterator = createLineIterator(fileIterator)
    var csvIterator = createCSVIterator(lineIterator)
    iterators.toArray(csvIterator, function(err, res) {
      assert.deepEqual(res, testData.rawResult)
      done()
    })
  })
})