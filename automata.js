let currentState = 0;

function updateState() {
    if (currentState === 0) {
        if (!getCave() && !getMarket() && !getTown()) {
          passage = passage
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
        if (getCave() && getMarket() && !getTown()) {
          currentState = 2
        }
        else if (getCave() && !getMarket() && getTown()) {
          currentState = 2
        }
        else if (getCave() && !getMarket() && !getTown()) {
          currentState = 2
        }
        else if (!getCave() && !getMarket() && !getTown()) {
          passage = toTown
          currentState = 3
        }
        else if (!getCave() && getMarket() && !getTown()) {
          passage = passage
          currentState = 4
        }
        else if (!getCave() && getMarket() && !getTown()) {
          passage = toMarket
          currentState = 4
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = passage
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toMarket
          currentState = 5
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = passage
          currentState = 8
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = toTown
          currentState = 8
        }
      }
      else if (currentState === 2) {
        if (getMarket() && !getTown()) {
          currentState = 2
        }
        else if (!getMarket() && !getTown()) {
          currentState = 2
        }
        else if (!getCave() && getMarket() && getTown()) {
          currentState = 2
        }
        else if (!getMarket() && getTown()) {
          currentState = 2
        }
      }
      else if (currentState === 3) {
        if (getCave() && getMarket() && !getTown()) {
          currentState = 2
        }
        else if (getCave() && !getMarket() && getTown()) {
          currentState = 2
        }
        else if (getCave() && !getMarket() && !getTown()) {
          currentState = 2
        }
        else if (!getCave() && !getMarket() && !getTown()) {
          passage = toMarket
          currentState = 3
        }
        else if (!getCave() && getMarket() && !getTown()) {
          passage = passage
          currentState = 4
        }
        else if (!getCave() && getMarket() && !getTown()) {
          passage = toTown
          currentState = 4
        }
        else if (!getCave() && getMarket() && !getTown()) {
          passage = toMarket
          currentState = 4
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = passage
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toMarket
          currentState = 5
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = passage
          currentState = 8
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = toTown
          currentState = 8
        }
      }
      else if (currentState === 4) {
        if (getCave() && !getMarket() && getTown()) {
          currentState = 2
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toTown
          passage = passage
          currentState = 2
        }
        else if (getCave() && getMarket() && !getTown()) {
          currentState = 2
        }
        else if (getCave() && !getMarket() && !getTown()) {
          currentState = 2
        }
        else if (!getCave() && !getTown()) {
          passage = toTown
          currentState = 4
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = passage
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toMarket
          currentState = 5
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = passage
          currentState = 5
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = toTown
          currentState = 5
        }
      }
      else if (currentState === 5) {
        if (getCave() && getMarket() && !getTown()) {
          currentState = 2
        }
        else if (getCave() && getMarket() && !getTown()) {
          passage = toMarket
          passage = passage
          currentState = 2
        }
        else if (getCave() && !getMarket() && getTown()) {
          currentState = 2
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toTown
          passage = passage
          currentState = 2
        }
        else if (getCave() && !getMarket() && !getTown()) {
          currentState = 2
        }
        else if (!getCave()) {
          passage = toCave
          currentState = 6
        }
      }
      else if (currentState === 6) {
        if (!getCave() && getMarket() && getTown()) {
          currentState = 2
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toMarket
          passage = toTown
          currentState = 2
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toMarket
          passage = passage
          currentState = 2
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toTown
          passage = passage
          currentState = 2
        }
        else if (!getCave() && getMarket() && !getTown()) {
          currentState = 2
        }
        else if (!getCave() && getMarket() && !getTown()) {
          passage = toMarket
          passage = passage
          currentState = 2
        }
        else if (!getCave() && !getMarket() && getTown()) {
          currentState = 2
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = toTown
          passage = passage
          currentState = 2
        }
        else if (!getCave() && !getMarket() && !getTown()) {
          currentState = 2
        }
        else if (getCave() && getMarket() && getTown()) {
          currentState = 7
        }
        else if (getCave() && getMarket() && !getTown()) {
          passage = passage
          currentState = 7
        }
        else if (getCave() && getMarket() && !getTown()) {
          passage = toMarket
          currentState = 7
        }
        else if (getCave() && !getMarket() && !getTown()) {
          passage = passage
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = passage
          currentState = 8
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toTown
          currentState = 8
        }
      }
      else if (currentState === 7) {
        if (getCave() && getMarket() && !getTown()) {
          currentState = 2
        }
        else if (getCave() && getMarket() && !getTown()) {
          passage = toMarket
          passage = passage
          currentState = 2
        }
        else if (getCave() && !getMarket() && getTown()) {
          currentState = 2
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toTown
          passage = passage
          currentState = 2
        }
        else if (getCave() && !getMarket() && !getTown()) {
          currentState = 2
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = passage
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toMarket
          currentState = 5
        }
        else if (!getCave() && !getTown()) {
          passage = toTown
          currentState = 7
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = passage
          currentState = 8
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = toTown
          currentState = 8
        }
      }
      else if (currentState === 8) {
        if (getCave() && getMarket() && !getTown()) {
          currentState = 2
        }
        else if (getCave() && getMarket() && !getTown()) {
          passage = toMarket
          passage = passage
          currentState = 2
        }
        else if (getCave() && !getMarket() && getTown()) {
          currentState = 2
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toTown
          passage = passage
          currentState = 2
        }
        else if (getCave() && !getMarket() && !getTown()) {
          currentState = 2
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = passage
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toMarket
          currentState = 5
        }
        else if (!getCave() && getMarket() && !getTown()) {
          passage = passage
          currentState = 5
        }
        else if (!getCave() && getMarket() && !getTown()) {
          passage = toMarket
          currentState = 5
        }
        else if (!getCave() && !getMarket()) {
          passage = toMarket
          currentState = 8
        }
      }
}