
/*

  Gratefully taken from Mike Bostock's d3.js implementation:
  https://github.com/mbostock/d3/blob/master/src/dsv/dsv.js

*/

var parseRows = function(text, f) {
  var delimiter = ','
  var delimiterCode = delimiter.charCodeAt(0);
  var EOL = {}, // sentinel value for end-of-line
      EOF = {}, // sentinel value for end-of-file
      rows = [], // output rows
      N = text.length,
      I = 0, // current character index
      n = 0, // the current line number
      t, // the current token
      eol; // is the current token followed by EOL?

  function token() {
    if (I >= N) return EOF; // special case: end of file
    if (eol) return eol = false, EOL; // special case: end of line

    // special case: quotes
    var j = I;
    if (text.charCodeAt(j) === 34) {
      var i = j;
      while (i++ < N) {
        if (text.charCodeAt(i) === 34) {
          if (text.charCodeAt(i + 1) !== 34) break;
          ++i;
        }
      }
      I = i + 2;
      var c = text.charCodeAt(i + 1);
      if (c === 13) {
        eol = true;
        if (text.charCodeAt(i + 2) === 10) ++I;
      } else if (c === 10) {
        eol = true;
      }
      return text.substring(j + 1, i).replace(/""/g, "\"");
    }

    // common case: find next delimiter or newline
    while (I < N) {
      var c = text.charCodeAt(I++), k = 1;
      if (c === 10) eol = true; // \n
      else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
      else if (c !== delimiterCode) continue;
      return text.substring(j, I - k);
    }

    // special case: last token before EOF
    return text.substring(j);
  }

  while ((t = token()) !== EOF) {
    var a = [];
    while (t !== EOL && t !== EOF) {
      a.push(t);
      t = token();
    }
    if (f && !(a = f(a, n++))) continue;
    rows.push(a);
  }

  return rows;
};

module.exports = parseRows
