'use strict';

var through = require('through2');
var path = require('path');
var reactJadeParse = require('react-jade/lib/parse');

var wrapper = require('./wrapper');

module.exports = function(filename, opts) {

  if (path.extname(filename) !== '.jade') {
    return through();
  }

  var output = through(function(buf, enc, next) {
    var jadeSrc = buf.toString('utf8');
    try {
      var fnSource = reactJadeParse(jadeSrc, {filename: filename});
    } catch (e) {
      return error(e);
    }

    this.push(wrapper(fnSource));
    next();
  });

  function error(msg) {
    var err = typeof msg === 'string' ? new Error(msg) : msg;
    output.emit('error', err);
  }

  return output;
};
