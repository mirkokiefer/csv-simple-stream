#csv-simple-stream
[![Build Status](https://travis-ci.org/mirkokiefer/csv-simple-stream.png?branch=master)](https://travis-ci.org/mirkokiefer/csv-simple-stream)

[![NPM](https://nodei.co/npm/csv-simple-stream.png)](https://nodei.co/npm/csv-simple-stream/)

A ligthweight [simple-stream](https://github.com/creationix/js-git/blob/master/specs/simple-stream.md) transform for parsing a character stream.

Example that creates a csv stream from a file and print rows 10 to 20:

``` js
var csvStream = require('csv-simple-stream')
var streamUtils = require('simple-stream')

var stream = csvStream.fromFile('input.csv', {from: 10, to: 20})
streamUtils.forEach(stream, console.log)
```

The resulting simple-stream can be used with the [simple-stream](https://github.com/mirkokiefer/simple-stream) module to apply transformations or write to a sink.

##Documentation
###fromLines(lineStream, [options]) -> stream

- `lineStream`: can be created using [line-simple-stream](https://github.com/mirkokiefer/line-simple-stream)

Options:

- `toObjects`: transform the rows from arrays to objects according to the csv header
- `from`: start iteration on the specified row index (index is inclusive)
- `to`: end iteration on the specified row index (index is inclusive)

###fromFile(path, options) -> stream
Same options as `fromLines`.

###toLines(dataStream, options) -> stream
Creates a stream that transforms arrays or objects to CSV formatted lines.

Options:
- `objects` (default: `false`): defines whether the source iterator returns arrays or objects
- `columns` (optional): If `objects: true` this option will configure the columns that are output.

###toFile(dataStream, path, [options], cb)
Convenience function that uses `toLines` to write directly to a file.

Options:
- same as `toCSV` options
- `encoding` (default `utf8`)
