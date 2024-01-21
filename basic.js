document.getElementById('runBasicGame').addEventListener("click", runBasicGame);

async function runBasicGame() {
  for (let step = 0; step < 15; step++) {
    if (!isRunning) {
      console.log("stopped game")
      break;
    }
    console.log("step: " + step)
    currentText = document.getElementById('adventureText').innerHTML.trim();

    // PREDICATE SPECIFIC
    // compute all predicates ahead of time for the sake of efficiency and money
  
    choice = await makeRandomBasicChoice(currentText);
    await getNextBasicPassage.call({ innerHTML: choice });
    preds = await Promise.all([
      checkObstacle("cave"),
      checkObstacle("market"),
      checkObstacle("town"),
      checkObstacle("forest"),
    ]);
    inCave = preds[0];
    inMarket = preds[1];
    inTown = preds[2];
    inForest = preds[3];

    console.log("inCave: " + inCave);
    console.log("inMarket: " + inMarket);
    console.log("inTown: " + inTown);
    console.log("inForest: " + inForest);

    choice = choice.replace("You", "I");
    safeChoice = await evalChoice(storySummary, choice);

    extractSafeCount(passage);

    console.log("safe: " + safeChoice);
    console.log("safe count: " + safeCount);

    if (inCave) {
      document.getElementById("caveCheck").checked = true;
    }
    if (inMarket) {
      document.getElementById("marketCheck").checked = true;
    }
    if (inTown) {
      document.getElementById("townCheck").checked = true;
    }
    if (inForest) {
      document.getElementById("forestCheck").checked = true;
    }
  
    updateCSVFile([runs, step, preds[0] ? 1 : 0, preds[1] ? 1 : 0, preds[2] ? 1 : 0, preds[3] ? 1 : 0, passageTarget, currentState, safeChoice ? 1 : 0, safeCount]);
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  console.log("finished game");
}

// randomly choose one of the two generated options to continue
async function makeRandomBasicChoice(nextPassage) {
  if (firstRound(nextPassage)) {
    console.log("first round")
    return "";
  }
  let choice1Prompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Given the passage, give a single next concrete action for the player, such as walking to the left. Refer to the reader as `You` and use the present active tense. Do not prefix options with numbers. Do not use the word `can`. Do not use the word `or`" }, //maybe ask for different kinds of options here - as mediated by TSL?
    { role: "user", content: nextPassage },
  ];
  let choice1;
  await openAIFetchAPI(choice1Prompt, 1, ".").then(userChoice => {
    choice1 = userChoice[0].message.content + ".";
  })

  let choice2Prompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Given the passage, give a single next concrete action for the player, such as walking to the left. Refer to the reader as `You` and use the present active tense. Do not prefix options with numbers. Do not use the word `can`. Do not use the word `or`. The choice must be a different concrete action from: `" + choice1 + "`." }, //maybe ask for different kinds of options here - as mediated by TSL?
    { role: "user", content: nextPassage },
  ];

  let choice2;
  await openAIFetchAPI(choice2Prompt, 1, ".").then(userChoice => {
    choice2 = userChoice[0].message.content + ".";
  });

  const options = [choice1, choice2]; //randomly choose one of the two options
  return options[Math.floor(Math.random() * 2)];
}

async function getNextBasicPassage() {
    currentText = document.getElementById('adventureText').innerHTML.trim();
    console.log(this.innerHTML);

    let verdict;
    if (safeChoice == false) {
      verdict = "unsafe";
    }
    else if (safeChoice == true) {
      verdict = "safe";
    }
    else {
      verdict = "neutral";
    }
  
    let passagePrompt = [
      { role: "system", content: "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story of at most 100 words. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense. The player cannot visit a cave until they visit a town. The player cannot visit a cave until they visit a market. The player will eventually visit a town. The player will eventually visit a market. The player will eventually visit a cave. After the player visits a town and a market, they must visit a cave. The player may visit these locations in a later passage. If the player is in a town and makes a safe choice, the `safeCount` count variable should be incremented by 1. The current amount of safe choices made is: " + safeCount + ". The the player just made a " + verdict.toString() + " choice. Once the player has made 3 safe choices and they are in a cave, they should go to a town. Make sure to output the current amount of safe choices made in the form: `safeCount=x` at the beginning of each story passage and the include the story, but remember that this variable can only be updated if the player is in a town, which right now, is " + inTown.toString() + ". If this is the first passage of the story, you should write an introductory passage of the story starting which describes the character and the setting. The initial setting must be a forest, not a market, town or cave." ,},
      { role: "assistant", content: storySummary + " " + currentText,},
      { role: "user", content: this.innerHTML.replace("You", "I"),},
    ];

    console.log(passagePrompt[0].content);
  
    let newText = await openAIFetchAPI(passagePrompt, 1, "\n")
    passage = newText[0].message.content;
    document.getElementById('adventureText').innerHTML = passage;
    console.log("next passage: " + currentText);
    document.getElementById('log').innerHTML += (this.innerHTML + "<br><br>" + passage + "<br><br>");

    summary = await updateSummary(passage)
    storySummary = summary;
    console.log("Generated passage: " + passage);
    console.log("Updated summary: " + storySummary);
  }

  function extractSafeCount(inputString) {
    // Regular expression to match the pattern safeCount=x
    const regex = /SafeCount=(\d+)/;
  
    // Use the regular expression to find the match in the input string
    const match = inputString.match(regex);
    const other = inputString.match(/safeCount=(\d+)/);
    const other2 = inputString.match(/safeCount = (\d+)/);
  
    // If a match is found, extract the numeric value and set safeCount

    if (match !== null) {
      const safeCountValue = parseInt(match[1], 10);
      safeCount = safeCountValue;
      console.log("safeCount set to", safeCount);
    } 
    else if (other !== null) {
      const safeCountValue = parseInt(other[1], 10);
      safeCount = safeCountValue;
      console.log("safeCount set to", safeCount);
    }
    else if (other2 !== null) {
      const safeCountValue = parseInt(other2[1], 10);
      safeCount = safeCountValue;
      console.log("safeCount set to", safeCount);
    }
    else {
      console.log("No safeCount found in the input string");
    }
  }
  