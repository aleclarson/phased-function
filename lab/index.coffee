
PhasedFunction = require ".."

func = PhasedFunction

  0: (phase, now) ->
    setTimeout ->
      phase.next now
    , 100

  1: (phase, now) ->
    setTimeout ->
      phase.goto 3, now
    , 100

  2: ->
    throw Error "This will never run!"

  3: (phase, now) ->
    log
      .moat 1
      .white "Elapsed time: "
      .green Date.now() - now
      .moat 1
    phase.done()

func Date.now()
