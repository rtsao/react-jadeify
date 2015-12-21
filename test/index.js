'use strict';

var fs = require('fs');
var browserify = require('browserify');
var test = require('tape');

var transform = require('../');

var tests = [
  {
    name: 'basic',
    opts: {}
  }
];

tests.forEach(testFromConfig);

function testFromConfig(config) {
  var fixturePath = './test/' + config.name + '.source.jade';
  var expected = fs.readFileSync('./test/' + config.name + '.expected.js', 'utf8');

  var b = browserify(fixturePath)
   .transform(transform)
   .exclude('react')
   .on('dep', function testEntryDep(dep) {
    if (dep.entry) {
      test(config.name, function(assert) {
        assert.equal(dep.source, expected, 'output matches expected');
        assert.end();
      });
    }
  })
  .bundle();
}


