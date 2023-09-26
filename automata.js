let currentState = 0;

function updateState() {
    if (currentState === 0) {
        if (!getCave() && !getMarket() && !getTown()) {
          passage = toTown
          currentState = 1
        }
        else if (getCave()) {
          currentState = 2
        }
        else if (getMarket()) {
          currentState = 2
        }
        else if (getTown()) {
          currentState = 2
        }
      }
      else if (currentState === 1) {
        if (!getCave() && !getMarket() && getTown()) {
          passage = toMarket
          currentState = 3
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toTown
          currentState = 4
        }
        else if (getCave()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && !getTown()) {
          passage = passage
          passage = toCave
          currentState = 7
        }
        else if (!getCave() && !getTown()) {
          passage = passage
          passage = toMarket
          currentState = 7
        }
        else if (!getCave() && !getTown()) {
          passage = passage
          passage = toTown
          currentState = 7
        }
        else if (!getCave() && !getTown()) {
          passage = toCave
          passage = toMarket
          currentState = 7
        }
        else if (!getCave() && !getTown()) {
          passage = toCave
          passage = toTown
          currentState = 7
        }
        else if (!getCave() && !getTown()) {
          passage = toMarket
          passage = toTown
          currentState = 7
        }
      }
      else if (currentState === 2) {
        if (!getCave()) {
          currentState = 2
        }
        else if (getCave()) {
          currentState = 7
        }
      }
      else if (currentState === 3) {
        if (!getCave() && getMarket()) {
          passage = toTown
          currentState = 4
        }
        else if (getCave() && !getMarket()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && !getMarket()) {
          currentState = 7
        }
        else if (getCave() && getMarket()) {
          currentState = 7
        }
        else if (!getCave() && !getMarket()) {
          passage = passage
          passage = toCave
          currentState = 7
        }
        else if (getCave() && getMarket()) {
          passage = passage
          passage = toCave
          currentState = 7
        }
        else if (!getCave() && !getMarket()) {
          passage = passage
          passage = toMarket
          currentState = 7
        }
        else if (getCave() && getMarket()) {
          passage = passage
          passage = toMarket
          currentState = 7
        }
        else if (!getCave() && !getMarket()) {
          passage = passage
          passage = toTown
          currentState = 7
        }
        else if (getCave() && getMarket()) {
          passage = passage
          passage = toTown
          currentState = 7
        }
        else if (!getCave() && !getMarket()) {
          passage = toCave
          passage = toMarket
          currentState = 7
        }
        else if (getCave() && getMarket()) {
          passage = toCave
          passage = toMarket
          currentState = 7
        }
        else if (!getCave() && !getMarket()) {
          passage = toCave
          passage = toTown
          currentState = 7
        }
        else if (getCave() && getMarket()) {
          passage = toCave
          passage = toTown
          currentState = 7
        }
        else if (!getCave() && !getMarket()) {
          passage = toMarket
          passage = toTown
          currentState = 7
        }
        else if (getCave() && getMarket()) {
          passage = toMarket
          passage = toTown
          currentState = 7
        }
      }
      else if (currentState === 4) {
        if (getCave() && getMarket()) {
          passage = toTown
          currentState = 5
        }
        else if (!getTown()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = toMarket
          currentState = 6
        }
        else if (getCave() && !getMarket() && getTown()) {
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = passage
          passage = toCave
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = passage
          passage = toMarket
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = passage
          passage = toTown
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toCave
          passage = toMarket
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toCave
          passage = toTown
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toMarket
          passage = toTown
          currentState = 7
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toCave
          currentState = 7
        }
      }
      else if (currentState === 5) {
        if (true) {
          currentState = 7
        }
      }
      else if (currentState === 6) {
        if (getCave() && getMarket()) {
          passage = toTown
          currentState = 5
        }
        else if (!getMarket()) {
          currentState = 7
        }
        else if (!getMarket()) {
          passage = passage
          passage = toCave
          currentState = 7
        }
        else if (!getMarket()) {
          passage = passage
          passage = toMarket
          currentState = 7
        }
        else if (!getMarket()) {
          passage = passage
          passage = toTown
          currentState = 7
        }
        else if (!getMarket()) {
          passage = toCave
          passage = toMarket
          currentState = 7
        }
        else if (!getMarket()) {
          passage = toCave
          passage = toTown
          currentState = 7
        }
        else if (!getMarket()) {
          passage = toMarket
          passage = toTown
          currentState = 7
        }
        else if (!getCave() && getMarket()) {
          passage = toCave
          currentState = 7
        }
      }
      else if (currentState === 7) {
        if (!getCave()) {
          passage = passage
          passage = toMarket
          currentState = 7
        }
        else if (!getCave()) {
          passage = passage
          passage = toTown
          currentState = 7
        }
        else if (!getCave()) {
          passage = toCave
          passage = toMarket
          currentState = 7
        }
        else if (!getCave()) {
          passage = toCave
          passage = toTown
          currentState = 7
        }
        else if (!getCave()) {
          passage = toMarket
          passage = toTown
          currentState = 7
        }
        else if (getCave() && getMarket()) {
          passage = passage
          currentState = 8
        }
        else if (getCave() && !getTown()) {
          passage = passage
          currentState = 8
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = passage
          currentState = 9
        }
      }
      else if (currentState === 8) {
        if (!getCave() && !getTown()) {
          passage = toTown
          currentState = 4
        }
        else if (getCave() && getMarket()) {
          passage = toTown
          currentState = 5
        }
        else if (getCave() && !getTown()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && !getMarket() && getTown()) {
          passage = toMarket
          currentState = 6
        }
        else if (getCave() && !getMarket() && getTown()) {
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = passage
          passage = toCave
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = passage
          passage = toMarket
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = passage
          passage = toTown
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toCave
          passage = toMarket
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toCave
          passage = toTown
          currentState = 7
        }
        else if (getCave() && !getMarket() && getTown()) {
          passage = toMarket
          passage = toTown
          currentState = 7
        }
        else if (!getCave() && getMarket() && getTown()) {
          passage = toCave
          currentState = 7
        }
      }
      else if (currentState === 9) {
        if (getCave() && getMarket()) {
          passage = toTown
          currentState = 5
        }
        else if (!getCave() && !getMarket()) {
          passage = toMarket
          currentState = 6
        }
        else if (getCave() && !getMarket()) {
          currentState = 7
        }
        else if (getCave() && !getMarket()) {
          passage = passage
          passage = toCave
          currentState = 7
        }
        else if (getCave() && !getMarket()) {
          passage = passage
          passage = toMarket
          currentState = 7
        }
        else if (getCave() && !getMarket()) {
          passage = passage
          passage = toTown
          currentState = 7
        }
        else if (getCave() && !getMarket()) {
          passage = toCave
          passage = toMarket
          currentState = 7
        }
        else if (getCave() && !getMarket()) {
          passage = toCave
          passage = toTown
          currentState = 7
        }
        else if (getCave() && !getMarket()) {
          passage = toMarket
          passage = toTown
          currentState = 7
        }
        else if (!getCave() && getMarket()) {
          passage = toCave
          currentState = 7
        }
      }     
}