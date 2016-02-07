var Factory, Phaser, assertType,
  slice = [].slice;

require("lotus-require");

assertType = require("type-utils").assertType;

Factory = require("factory");

Phaser = require("./Phaser");

module.exports = Factory("PhasedFunction", {
  kind: Function,
  initArguments: function(phases) {
    assertType(phases, [Array, Object]);
    return arguments;
  },
  create: function(phases) {
    var keys;
    keys = Object.keys(phases);
    return function() {
      var bind, phase;
      bind = this;
      phase = Phaser(keys, function() {
        var args, isLastPhase, key;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        key = keys[phase._index];
        isLastPhase = phase._index === (phase._keys.length - 1);
        args.unshift(phase);
        phases[key].apply(bind, args);
      });
      return phase(arguments);
    };
  }
});

//# sourceMappingURL=../../map/src/PhasedFunction.map
