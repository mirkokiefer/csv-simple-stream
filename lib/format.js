/*

  Gratefully taken from Mike Bostock's d3.js implementation:
  https://github.com/mbostock/d3/blob/master/src/dsv/dsv.js

*/
var delimiter = ','
var reFormat = new RegExp("[\"" + delimiter + "\n]")

function formatRow(row) {
  return row.map(formatValue).join(delimiter);
}

function formatValue(text) {
  return reFormat.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
}

module.exports = formatRow
