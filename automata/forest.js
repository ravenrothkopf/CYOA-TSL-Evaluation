
let toForest = "toForest";
let inForest = false;

function updateForest() {
  if (currentState === 0) {
    if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = toForest
      currentState = 1
    }
    else if (getCave()) {
      currentState = 7
    }
    else if (getMarket()) {
      currentState = 7
    }
    else if (getTown()) {
      currentState = 7
    }
  }
  else if (currentState === 1) {
    if (getCave() && getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      currentState = 2
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = toTown
      currentState = 3
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toTown
      currentState = 4
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 5
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 8
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 8
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 8
    }
  }
  else if (currentState === 2) {
    if (!getMarket() && !getTown()) {
      currentState = 2
    }
    else if (!getMarket() && getTown()) {
      currentState = 2
    }
    else if (getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getMarket() && getTown()) {
      currentState = 2
    }
  }
  else if (currentState === 3) {
    if (getCave() && getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      currentState = 2
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = toMarket
      currentState = 3
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toTown
      currentState = 4
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toMarket
      currentState = 4
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toForest
      currentState = 4
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      currentState = 4
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 5
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 8
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 8
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 8
    }
  }
  else if (currentState === 4) {
    if (getCave() && getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      currentState = 2
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toTown
      currentState = 4
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toMarket
      currentState = 4
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toForest
      currentState = 4
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      currentState = 4
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = toTown
      currentState = 4
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = toForest
      currentState = 4
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = passageTarget
      currentState = 4
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 5
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 5
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 5
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 5
    }
  }
  else if (currentState === 5) {
    if (getCave() && getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (!getCave()) {
      passageTarget = toCave
      currentState = 6
    }
  }
  else if (currentState === 6) {
    if (!getCave() && getMarket() && getTown()) {
      currentState = 2
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      passageTarget = toTown
      currentState = 2
    }
    else if (!getCave() && getMarket() && !getTown()) {
      currentState = 2
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (!getCave() && !getMarket() && getTown()) {
      currentState = 2
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      currentState = 2
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 5
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      currentState = 5
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 5
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 5
    }
    else if (getCave() && !getTown()) {
      passageTarget = toTown
      currentState = 7
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 8
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 8
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 8
    }
  }
  else if (currentState === 7) {
    if (getCave() && getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = toMarket
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 5
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toTown
      currentState = 7
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toMarket
      currentState = 7
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toForest
      currentState = 7
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      currentState = 7
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = toTown
      currentState = 7
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = toForest
      currentState = 7
    }
    else if (!getCave() && !getMarket() && !getTown()) {
      passageTarget = passageTarget
      currentState = 7
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 8
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 8
    }
    else if (!getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 8
    }
  }
  else if (currentState === 8) {
    if (getCave() && getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && getMarket() && !getTown()) {
      passageTarget = toForest
      passageTarget = toMarket
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = passageTarget
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && getTown()) {
      passageTarget = toForest
      passageTarget = toTown
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      currentState = 2
    }
    else if (getCave() && !getMarket() && !getTown()) {
      passageTarget = passageTarget
      passageTarget = toForest
      currentState = 2
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toTown
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toMarket
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = toForest
      currentState = 5
    }
    else if (!getCave() && getMarket() && getTown()) {
      passageTarget = passageTarget
      currentState = 5
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toMarket
      currentState = 5
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = toForest
      currentState = 5
    }
    else if (!getCave() && getMarket() && !getTown()) {
      passageTarget = passageTarget
      currentState = 5
    }
    else if (!getCave() && !getMarket()) {
      passageTarget = toMarket
      currentState = 8
    }
  }  
}