
require "lotus-require"

{ assertType } = require "type-utils"

Factory = require "factory"

Phaser = require "./Phaser"

module.exports = Factory "PhasedFunction",

  kind: Function

  initArguments: (phases) ->
    assertType phases, [ Array, Object ]
    arguments

  create: (phases) ->
    keys = Object.keys phases
    return ->
      bind = this
      phase = Phaser keys, (args...) ->
        key = keys[phase._index]
        isLastPhase = phase._index is (phase._keys.length - 1)
        args.unshift phase
        phases[key].apply bind, args
        return
      phase arguments
