#csv-iterator
[![Build Status](https://travis-ci.org/mirkokiefer/csv-iterator.png?branch=master)](https://travis-ci.org/mirkokiefer/csv-iterator)

[![NPM](https://nodei.co/npm/csv-iterator.png)](https://nodei.co/npm/csv-iterator/)

A ligthweight async csv-iterator for Node.js.

Example that creates an iterator from a file to iterate over rows 10 to 20:

``` js
var csvIterator = require('csv-iterator')

var iterator = csvIterator.fromFile('input.csv', {from: 10, to: 20})
```

The resulting iterator can be used with the [async-iterators](https://github.com/mirkokiefer/async-iterators) module to apply transformations or write to a target.

##Documentation
###fromLineIterator(lineIterator, options)
Options:

- `toObjects`: transform the rows from arrays to objects according to the csv header
- `from`: start iteration on the specified row index (index is inclusive)
- `to`: end iteration on the specified row index (index is inclusive)

###fromFile(path, options)
Same options as `fromLineIterator`.

###toLines(iterator, options)
Creates an iterator that transforms arrays or objects to CSV formatted lines.

Options:
- `objects` (default: `false`): defines whether the source iterator returns arrays or objects
- `columns` (optional): If `objects: true` this option will configure the columns that are output.

###toFile(iterator, path, [options], cb)
Convenience function that uses `toLines` to write directly to a file.

Options:
- same as `toCSV` options
- `encoding` (default `utf8`)