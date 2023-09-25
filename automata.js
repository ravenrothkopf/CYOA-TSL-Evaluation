let currentState = 0;

function updateState(passage) {
    if (currentState === 0) {
        if (!inCave(passage) && !inMarket(passage) && !inTown(passage)) {
          passage = toTown()
          storySummary = updateSummary(passage)
          currentState = 1
        }
        else if (inCave(passage)) {
          currentState = 2
        }
        else if (inMarket(passage)) {
          currentState = 2
        }
        else if (inTown(passage)) {
          currentState = 2
        }
      }
    else if (currentState === 1) {
        if (inCave(passage) && !inMarket(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (inCave(passage) && !inMarket(passage)) {
          storySummary = updateSummary(passage)
          passage = passage
          currentState = 3
        }
        else if (inCave(passage) && !inTown(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (inCave(passage) && !inTown(passage)) {
          storySummary = updateSummary(passage)
          passage = passage
          currentState = 3
        }
        else if (!inCave(passage) && !inTown(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (inCave(passage) && inMarket(passage) && inTown(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (!inCave(passage) && !inMarket(passage) && inTown(passage)) {
          passage = toMarket()
          storySummary = updateSummary(passage)
          currentState = 4
        }
        else if (!inCave(passage) && inMarket(passage) && inTown(passage)) {
          passage = toTown()
          storySummary = updateSummary(passage)
          currentState = 5
        }
      }
    else if (currentState === 2) {
        if (!inCave(passage)) {
          currentState = 2
        }
        else if (inCave(passage)) {
          currentState = 9
        }
      }
    else if (currentState === 3) {
        if (true) {
          currentState = 9
        }
      }
    else if (currentState === 4) {
        if (inCave(passage) && !inMarket(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (inCave(passage) && !inMarket(passage)) {
          storySummary = updateSummary(passage)
          passage = passage
          currentState = 3
        }
        else if (!inCave(passage) && !inMarket(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (inCave(passage) && inMarket(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (!inCave(passage) && inMarket(passage)) {
          passage = toTown()
          storySummary = updateSummary(passage)
          currentState = 5
        }
      }
    else if (currentState === 5) {
        if (inCave(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (!inTown(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (!inCave(passage) && !inMarket(passage) && inTown(passage)) {
          passage = toMarket()
          storySummary = updateSummary(passage)
          currentState = 6
        }
        else if (!inCave(passage) && inMarket(passage) && inTown(passage)) {
          passage = toCave()
          storySummary = updateSummary(passage)
          currentState = 7
        }
      }
    else if (currentState === 6) {
        if (inCave(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (!inMarket(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (!inCave(passage) && inMarket(passage)) {
          passage = toCave()
          storySummary = updateSummary(passage)
          currentState = 7
        }
      }
    else if (currentState === 7) {
        if (!inCave(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (inCave(passage) && inMarket(passage)) {
          storySummary = updateSummary(passage)
          passage = passage
          currentState = 8
        }
        else if (inCave(passage) && !inTown(passage)) {
          storySummary = updateSummary(passage)
          passage = passage
          currentState = 8
        }
        else if (inCave(passage) && !inMarket(passage) && inTown(passage)) {
          storySummary = updateSummary(passage)
          passage = passage
          currentState = 9
        }
      }
    else if (currentState === 8) {
        if (inCave(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (!inCave(passage) && !inTown(passage)) {
          passage = toTown()
          storySummary = updateSummary(passage)
          currentState = 5
        }
        else if (!inCave(passage) && !inMarket(passage) && inTown(passage)) {
          passage = toMarket()
          storySummary = updateSummary(passage)
          currentState = 6
        }
        else if (!inCave(passage) && inMarket(passage) && inTown(passage)) {
          passage = toCave()
          storySummary = updateSummary(passage)
          currentState = 7
        }
      }
    else if (currentState === 9) {
        if (inCave(passage)) {
          passage = passage
          storySummary = storySummary
          currentState = 3
        }
        else if (!inCave(passage) && !inMarket(passage)) {
          passage = toMarket()
          storySummary = updateSummary(passage)
          currentState = 6
        }
        else if (!inCave(passage) && inMarket(passage)) {
          passage = toCave()
          storySummary = updateSummary(passage)
          currentState = 7
        }
      }   
    return passage;
}