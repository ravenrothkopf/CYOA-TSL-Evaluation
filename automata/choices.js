const safeLimit = 3;
let safeCount = 0;
let safeChoice;

function safe() {
  return safeChoice;
}

function safeThreshold() {
  return safeCount >= safeLimit;
}

function updateChoiceState() {
  if (currentState === 0) {
    if (!getTown() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 1
    }
  }
  else if (currentState === 1) {
    if (!getTown() && !getCave() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 1
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 3
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 4
    }
    else if (getTown() && !safe() && !getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 4
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount + 1
      currentState = 6
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 7
    }
  }
  else if (currentState === 2) {
    if (!getTown() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safeThreshold() && getMarket()) {
      currentState = 2
    }
  }
  else if (currentState === 3) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 3
    }
    else if (!getTown() && !getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 3
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 7
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 7
    }
  }
  else if (currentState === 4) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !getCave() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 4
    }
    else if (!safe() && !getCave() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 4
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount + 1
      currentState = 4
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (!getTown() && !getCave() && getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount + 1
      currentState = 6
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 7
    }
  }
  else if (currentState === 5) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !getCave()) {
      passageTarget = toCave
      safeCount = safeCount
      currentState = 8
    }
    else if (!safe() && !getCave()) {
      passageTarget = toCave
      safeCount = safeCount
      currentState = 8
    }
    else if (getTown() && safe() && !getCave() && safeThreshold()) {
      passageTarget = toCave
      safeCount = safeCount + 1
      currentState = 8
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
  }
  else if (currentState === 6) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 4
    }
    else if (getTown() && !safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 4
    }
    else if (!getTown() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 4
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (!getTown() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 6
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 6
    }
    else if (!getTown() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 6
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 7
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 7
    }
    else if (!getTown() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 7
    }
  }
  else if (currentState === 7) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (!getTown() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 5
    }
    else if (!getTown() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = passageTarget
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 7
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 7
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 7
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 7
    }
    else if (!getTown() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 7
    }
    else if (!getTown() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = passageTarget
      safeCount = safeCount
      currentState = 7
    }
  }
  else if (currentState === 8) {
    if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && !getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && !getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (!getTown() && getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 10
    }
    else if (!getTown() && getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 11
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 12
    }
    else if (getTown() && !safe() && getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 12
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 13
    }
  }
  else if (currentState === 9) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && !getCave() && safeThreshold()) {
      passageTarget = toCave
      safeCount = safeCount
      currentState = 8
    }
    else if (!safe() && !getCave() && safeThreshold()) {
      passageTarget = toCave
      safeCount = safeCount
      currentState = 8
    }
    else if (getTown() && safe() && !getCave() && safeThreshold()) {
      passageTarget = toCave
      safeCount = safeCount + 1
      currentState = 8
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 9
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 9
    }
    else if (!getTown() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 9
    }
    else if (!getTown() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = passageTarget
      safeCount = safeCount
      currentState = 9
    }
  }
  else if (currentState === 10) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (!getTown() && !getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 10
    }
    else if (!getTown() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 11
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount + 1
      currentState = 13
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount + 1
      currentState = 14
    }
    else if (getTown() && !safe() && !getCave() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 14
    }
  }
  else if (currentState === 11) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (!getTown() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 11
    }
    else if (!getTown() && !getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 11
    }
  }
  else if (currentState === 12) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (!getTown() && !getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 10
    }
    else if (!getTown() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 11
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 13
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount + 1
      currentState = 14
    }
    else if (getTown() && !safe() && !getCave() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 14
    }
  }
  else if (currentState === 13) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 9
    }
    else if (!getTown() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 11
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 13
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 13
    }
    else if (!getTown() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = passageTarget
      safeCount = safeCount
      currentState = 13
    }
    else if (!getTown() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 14
    }
    else if (!safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 14
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount + 1
      currentState = 14
    }
    else if (!getTown() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 15
    }
  }
  else if (currentState === 14) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (!getTown() && !getCave() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 11
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 13
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 14
    }
    else if (getTown() && !safe() && !getCave() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 14
    }
    else if (!getTown() && !getCave() && !getMarket()) {
      passageTarget = toMarket
      safeCount = safeCount
      currentState = 14
    }
  }
  else if (currentState === 15) {
    if (getTown() && safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && !safe() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (!getTown() && getCave() && !safeThreshold() && !getMarket()) {
      currentState = 2
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 5
    }
    else if (getTown() && !safe() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 5
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 9
    }
    else if (getTown() && safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount + 1
      currentState = 9
    }
    else if (getTown() && !safe() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 9
    }
    else if (!getTown() && !getCave() && safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 11
    }
    else if (!getTown() && !getCave() && safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 11
    }
    else if (!getTown() && !getCave() && !safeThreshold() && getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 15
    }
    else if (!getTown() && !getCave() && !safeThreshold() && !getMarket()) {
      passageTarget = toTown
      safeCount = safeCount
      currentState = 15
    }
  }
}