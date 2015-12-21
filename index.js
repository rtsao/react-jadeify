'use strict';

var through = require('through2');
var path = require('path');
var reactJadeParse = require('react-jade/lib/parse');

// See: http://git.io/vEk71
var EXTRA_REGEX = /;\nreturn fn;$/;

module.exports = function (filename, opts) {

  if (path.extname(filename) !== '.jade') {
    return through2();
  }

  var output = through(function(buf, enc, next) {
    var jadeSrc = buf.toString('utf8');
    try {
      var fnSource = reactJadeParse(jadeSrc, {filename: filename});
    } catch (e) {
      return error(e);
    }

    var code = [
      '"use strict";',
      'var React = require("react");',
      fnSource.replace(EXTRA_REGEX, ''),
      'module.exports = fn;'
    ].join('\n');

    this.push(code);
    next();
  });

  function error(msg) {
    var err = typeof msg === 'string' ? new Error(msg) : msg;
    output.emit('error', err);
  }

  return output;
};
