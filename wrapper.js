'use strict';

// See: http://git.io/vEk71
var EXTRA_REGEX = /;\nreturn fn;$/;

module.exports = function wrapCode(code) {
  return [
    '"use strict";',
    'var React = require("react");',
    code.replace(EXTRA_REGEX, ''),
    'module.exports = fn;'
  ].join('\n');
}
