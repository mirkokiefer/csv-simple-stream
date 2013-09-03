#csv-iterator

A ligthweight async csv-iterator for Node.js.

Example that creates an iterator from a file to iterate over rows 10 to 20:

``` js
var createCSVIterator = require('csv-iterator')

var iterator = createCSVIterator({path: 'input.csv', from: 10, to: 20})
```

The resulting iterator can be used with the [async-iterators](https://github.com/mirkokiefer/async-iterators) module to apply transformations or write to a target.

##Documentation
##createCSVIterator(options)

- `path`: use a file path as the input source
- `lineIterator`: use an async [line-iterator](https://github.com/mirkokiefer/line-iterator) as the input source
- `toObjects`: transform the rows from arrays to objects according to the csv header
- `from`: start iteration on the specified row index (index is inclusive)
- `to`: end iteration on the specified row index (index is inclusive)
