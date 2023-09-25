# CYOA x TSL x LLMs

## Cave and Market Arbiter Spec

```python
always assume {
    !(inCave(passage) && inMarket(passage));
    [passage <- toCave()] -> F inCave(passage);
    [passage <- toMarket()] -> F inMarket(passage);
}

always guarantee {
     F [passage <- toCave()];
     F [passage <- toMarket()];
     [summary <- updateSummary()];
}
```

## Code

```jsx
//goto cave
if (currentState === 0) {
  if (inCave(passage) && !inMarket(passage)) {
    passage = passage
    summary = updateSummary()
    currentState = 1
  }
  else if (inCave(passage) && !inMarket(passage)) {
    passage = toCave()
    summary = updateSummary()
    currentState = 1
  }
  else if (!inCave(passage)) {
    passage = passage
    summary = updateSummary()
    currentState = 1
  }
}
//goto market
else if (currentState === 1) {
  else if (!inCave(passage) && inMarket(passage)) {
    passage = toMarket()
		summary = updateSummary()
    currentState = 2
  }
  else if (!inMarket(passage)) {
    passage = toMarket()
    summary = updateSummary()
    currentState = 2
  }
}
//goto cave
else if (currentState === 2) {
  if (!inCave(passage) && inMarket(passage)) {
    passage = toCave()
    summary = updateSummary()
    currentState = 1
  }
  else if (!inMarket(passage)) {
    passage = toCave()
    summary = updateSummary()
    currentState = 1
  }
}
```

## Arbiter + ending spec

```jsx
always assume {
    !(inCave(passage) && inMarket(passage));
    [passage <- toCave()] -> F inCave(passage);
    [passage <- toMarket()] -> F inMarket(passage);
    [passage <- endGame()] -> X isEnd(passage);
}

always guarantee {
     F [passage <- toCave()];
     F [passage <- toMarket()];
     inCave(passage) -> F [passage <- endGame()];
     [summary <- updateSummary()];
}
```

## Code

```jsx
//initial state?
if (currentState === 0) {
  if (!inCave(passage) && inMarket(passage)) {
    summary = updateSummary()
    passage = passage
    currentState = 1
  }
  else if (!inCave(passage) && inMarket(passage)) {
    passage = toMarket()
    summary = updateSummary()
    currentState = 1
  }
  else if (!inCave(passage) && !inMarket(passage)) {
    summary = updateSummary()
    passage = passage
    currentState = 1
  }
  else if (inCave(passage) && !inMarket(passage)) {
    passage = endGame()
    summary = updateSummary()
    currentState = 2
  }
}
//goto market
else if (currentState === 1) {
  if (!inCave(passage) && inMarket(passage)) {
    passage = toMarket()
    summary = updateSummary()
    currentState = 3
  }
  else if (!inCave(passage) && !inMarket(passage)) {
    passage = toMarket()
    summary = updateSummary()
    currentState = 3
  }
  else if (inCave(passage) && !inMarket(passage)) {
    passage = toMarket()
    summary = updateSummary()
    currentState = 4
  }
}
//end state!!
else if (currentState === 2) {
  if (!inCave(passage) && inMarket(passage) && isEnd(passage)) {
    passage = toMarket()
    summary = updateSummary()
    currentState = 3
  }
  else if (!inCave(passage) && !inMarket(passage) && isEnd(passage)) {
    passage = toMarket()
    summary = updateSummary()
    currentState = 3
  }
  else if (inCave(passage) && !inMarket(passage) && isEnd(passage)) {
    passage = toMarket()
    summary = updateSummary()
    currentState = 4
  }
  else if (inCave(passage) && !inMarket(passage) && !isEnd(passage)) {
    currentState = 5
  }
  else if (inCave(passage) && !inMarket(passage) && !isEnd(passage)) {
    passage = toCave()
    passage = passage
    currentState = 5
  }
  else if (inCave(passage) && !inMarket(passage) && !isEnd(passage)) {
    currentState = 5
  }
  else if (inCave(passage) && !inMarket(passage) && !isEnd(passage)) {
    summary = summary
    currentState = 5
  }
  else if (!inCave(passage) && inMarket(passage) && !isEnd(passage)) {
    currentState = 5
  }
  else if (!inCave(passage) && inMarket(passage) && !isEnd(passage)) {
    passage = toMarket()
    passage = passage
    currentState = 5
  }
  else if (!inCave(passage) && inMarket(passage) && !isEnd(passage)) {
    currentState = 5
  }
  else if (!inCave(passage) && inMarket(passage) && !isEnd(passage)) {
    summary = summary
    currentState = 5
  }
  else if (!inCave(passage) && !inMarket(passage) && !isEnd(passage)) {
    currentState = 5
  }
  else if (!inCave(passage) && !inMarket(passage) && !isEnd(passage)) {
    currentState = 5
  }
  else if (!inCave(passage) && !inMarket(passage) && !isEnd(passage)) {
    summary = summary
    currentState = 5
  }
}
//goto cave
else if (currentState === 3) {
  if (!inCave(passage)) {
    passage = toCave()
    summary = updateSummary()
    currentState = 1
  }
  else if (inCave(passage) && !inMarket(passage)) {
    passage = toCave()
    summary = updateSummary()
    currentState = 6
  }
}
//goto cave
else if (currentState === 4) {
  if (inCave(passage) && !inMarket(passage)) {
    passage = toCave()
    summary = updateSummary()
    currentState = 6
  }
  else if (!inCave(passage) && inMarket(passage)) {
    passage = toCave()
    summary = updateSummary()
    currentState = 6
  }
  else if (!inCave(passage) && !inMarket(passage)) {
    passage = toCave()
    summary = updateSummary()
    currentState = 6
  }
}
//dead state
else if (currentState === 5) {
  else if (!inCave(passage) && !inMarket(passage)) {
    currentState = 5
  }
  else if (!inCave(passage) && inMarket(passage)) {
    currentState = 5
  }
}
//end game
else if (currentState === 6) {
  if (!inCave(passage)) {
    passage = endGame()
    summary = updateSummary()
    currentState = 2
  }
  else if (!inMarket(passage)) {
    passage = endGame()
    summary = updateSummary()
    currentState = 2
  }
}
```

## State machine visualization

<div align=center><img src="automaton.png" width="70%" height="70%"></div>

**Description**: This automaton starts at initial `state 0`, updates the summary with the introductory passage, then proceeds to `state 1`. Since, at the beginning, the player is neither in a cave or a market, we prompt the LLM for a market passage and proceed to `state 3`. Since we are still not in the cave, we prompt the LLM for a cave passage and proceed to  `state 1`. The arbiter continues until the LLM actually gives us a cave passage, which may not happen right away. Which ever of the arbiter states we’re at when the `inCave(passage)` predicate returns true, we remain in the cave and proceed to the end game `state 2` in either the next 1 or 2 time steps. when `isEnd(passage)` is called in the if statement, it immediately resets the game so the automaton never proceeds to the dead `state 5` which is generated as the result of violated assumptions (I got rid of the violated assumption transitions from the code because they just took up space). The summary is also updated in every time step.
