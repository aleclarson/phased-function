
# phased-function v1.0.0 [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

```coffee
PhasedFunction = require "phased-function"

func = PhasedFunction

  0: (phase, now) ->
    # Every phase is passed a `Phaser` object.
    # Any arguments passed to the `PhasedFunction` are accessible.

    # Asynchronous phases are easy with the `Phaser`!
    # Call `phase.next()` to continue to the next phase.
    phase.next now

    # You can easily end the `PhasedFunction` early with `phase.done()`!
    # Calling `phase.done()` after `phase.next()` won't do anything!
    phase.done()

  1: (phase, now) ->
    # You can skip phases or jump back in time.
    phase.goto 3, now

  2: ->
    # This phase will never run because it is skipped. :(

  3: (phase, now) ->

    console.log Date.now() - now

    # You must call `phase.done()` when you are finished.
    phase.done()

func Date.now()
```

Feel free to define a `PhasedFunction` on an object's prototype!

```coffee
obj =

  x: 5

  func: PhasedFunction

    0: (phase, y) ->

      console.log @x + y

      phase.done()

obj.func 5
```
