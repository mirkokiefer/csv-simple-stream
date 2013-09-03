
var assert = require('assert')
var csvIterator = require('../index')
var iterators = require('async-iterators')
var testData = require('./test-data/result')

describe('csv-iterator', function() {
  it('should iterate over a csv file', function(done) {
    var testFile = __dirname + '/test-data/input.csv'
    var iterator = csvIterator({path: testFile})
    iterators.toArray(iterator, function(err, res) {
      assert.deepEqual(res, testData.rawResult)
      done()
    })
  })
})