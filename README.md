# react-jadeify

[![build status][build-badge]][build-href]
[![coverage status][coverage-badge]][coverage-href]
[![dependencies status][deps-badge]][deps-href]

Browserify transform that allows you to require jade files and get back React DOM elements. Powered by [react-jade](https://github.com/pugjs/react-jade).

### CLI usage

```
browserify -t react-jadeify main.js
```

### API usage

```javascript
var browserify = require('browserify');
var reactJadeify = require('react-jadeify');

var b = browserify('./main.js');
b.transform(reactJadeify);
b.bundle();
```

[build-badge]: https://travis-ci.org/rtsao/react-jadeify.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/react-jadeify
[coverage-badge]: https://coveralls.io/repos/rtsao/react-jadeify/badge.svg?branch=master&service=github
[coverage-href]: https://coveralls.io/github/rtsao/react-jadeify?branch=master
[deps-badge]: https://david-dm.org/rtsao/react-jadeify.svg
[deps-href]: https://david-dm.org/rtsao/react-jadeify
