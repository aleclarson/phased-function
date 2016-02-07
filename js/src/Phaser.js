var Factory, assertType, reportFailure,
  slice = [].slice;

assertType = require("type-utils").assertType;

reportFailure = require("report-failure");

Factory = require("factory");

module.exports = Factory("Phaser", {
  kind: Function,
  func: function(args) {
    return this._func.apply(null, args);
  },
  initArguments: function(keys, func) {
    assertType(keys, Array);
    assertType(func, Function);
    return arguments;
  },
  initValues: function(keys, func) {
    return {
      _index: 0,
      _keys: keys,
      _func: func
    };
  },
  goto: function() {
    var args, error, index, key;
    key = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    index = this._keys.indexOf("" + key);
    if (index < 0) {
      error = Error("Invalid phase: '" + key + "'");
      reportFailure(error, {
        key: key,
        keys: keys
      });
    }
    this._index = index;
    this._func.apply(null, args);
  },
  next: function() {
    this._index++;
    this._func.apply(null, arguments);
  },
  done: function() {
    this._func = null;
  }
});

//# sourceMappingURL=../../map/src/Phaser.map
