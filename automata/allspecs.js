function updateSafe(){
    if (currentState === 0) {
        if (!getCave() && !getTown() && !safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 4
        }
      }
      else if (currentState === 1) {
        if (getCave() && safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (!getCave()) {
          passageTarget = toCave
          safeCount = safeCount
          currentState = 3
        }
      }
      else if (currentState === 2) {
        if (!getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (!getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getTown() && safeThreshold()) {
          currentState = 2
        }
      }
      else if (currentState === 3) {
        if (getCave() && safe() && getTown() && safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount + 1
          currentState = 1
        }
        else if (getCave() && !safe() && getTown()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 1
        }
        else if (!getCave() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (!getCave() && getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (!getCave() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (!getCave() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && !getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (!getCave() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount + 1
          currentState = 4
        }
        else if (getCave() && !safe() && !getTown()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 4
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount + 1
          currentState = 5
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount + 1
          currentState = 6
        }
      }
      else if (currentState === 4) {
        if (!getCave() && getTown()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 1
        }
        else if (!getCave() && getTown()) {
          passageTarget = passageTarget
          safeCount = safeCount
          currentState = 1
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && !getTown()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 4
        }
        else if (!getCave() && !getTown()) {
          passageTarget = passageTarget
          safeCount = safeCount
          currentState = 4
        }
      }
      else if (currentState === 5) {
        if (!getCave() && getTown() && safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 1
        }
        else if (!getCave() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          safeCount = safeCount
          currentState = 1
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && !getTown() && safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 4
        }
        else if (!getCave() && !getTown() && !safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 5
        }
        else if (!getCave() && !getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          safeCount = safeCount
          currentState = 5
        }
        else if (!getCave() && getTown() && !safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 6
        }
        else if (!getCave() && getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          safeCount = safeCount
          currentState = 6
        }
      }
      else if (currentState === 6) {
        if (!getCave() && getTown() && safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 1
        }
        else if (!getCave() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          safeCount = safeCount
          currentState = 1
        }
        else if (!getCave() && !getTown() && safeThreshold()) {
          passageTarget = passageTarget
          safeCount = safeCount
          currentState = 1
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && getTown() && !safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          passageTarget = toTown
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && safe() && !getTown() && !safeThreshold()) {
          safeCount = safeCount
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          safeCount = safeCount + 1
          currentState = 2
        }
        else if (getCave() && !safe() && !getTown() && !safeThreshold()) {
          currentState = 2
        }
        else if (!getCave() && getTown() && !safeThreshold()) {
          passageTarget = toTown
          safeCount = safeCount
          currentState = 6
        }
        else if (!getCave() && getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          safeCount = safeCount
          currentState = 6
        }
        else if (!getCave() && !getTown() && !safeThreshold()) {
          passageTarget = passageTarget
          safeCount = safeCount
          currentState = 6
        }
      }    
}