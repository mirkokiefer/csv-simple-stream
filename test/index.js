
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
  it('should iterate over a limited range', function(done) {
    var testFile = __dirname + '/test-data/input.csv'
    var iterator = csvIterator({path: testFile, from: 10, to: 19})
    iterators.toArray(iterator, function(err, res) {
      assert.deepEqual(res, testData.rawResult.slice(10, 20))
      done()
    })
  })
  it('should iterate and transform lines to objects', function(done) {
    var testFile = __dirname + '/test-data/input.csv'
    var iterator = csvIterator({path: testFile, toObjects: true, to: 1})
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
})