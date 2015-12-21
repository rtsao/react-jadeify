"use strict";
var React = require("react");
var fn = function(locals) {
  var tags = [];
  tags.push(React.createElement("div", {}, "foo"));
  if (tags.length === 1 && !Array.isArray(tags[0])) {
    return tags.pop();
  }
  tags.unshift("div", null);
  return React.createElement.apply(React, tags);
};

fn.locals = function setLocals(locals) {
  var render = this;
  function newRender(additionalLocals) {
    var newLocals = {};
    for (var key in locals) {
      newLocals[key] = locals[key];
    }
    if (additionalLocals) {
      for (var key in additionalLocals) {
        newLocals[key] = additionalLocals[key];
      }
    }
    return render.call(this, newLocals);
  }
  newRender.locals = setLocals;
  return newRender;
};
module.exports = fn;