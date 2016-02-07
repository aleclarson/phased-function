
{ assertType } = require "type-utils"

reportFailure = require "report-failure"
Factory = require "factory"

module.exports = Factory "Phaser",

  kind: Function

  func: (args) ->
    @_func.apply null, args

  initArguments: (keys, func) ->
    assertType keys, Array
    assertType func, Function
    arguments

  initValues: (keys, func) ->
    _index: 0
    _keys: keys
    _func: func

  goto: (key, args...) ->
    index = @_keys.indexOf "" + key
    if index < 0
      error = Error "Invalid phase: '#{key}'"
      reportFailure error, { key, keys }
    @_index = index
    @_func.apply null, args
    return

  next: ->
    @_index++
    @_func.apply null, arguments
    return

  done: ->
    @_func = null
    return
