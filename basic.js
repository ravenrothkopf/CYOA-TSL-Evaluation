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
    if (firstRound(currentText)) {
      appendToCSVFile([runs, step, 0, 0, 0, passageTarget, currentState]);
    }
    else {
      // compute all predicates ahead of time for the sake of efficiency and money
      preds = await getPreds();
      appendToCSVFile([runs, step, preds[0] ? 1 : 0, preds[1] ? 1 : 0, preds[2] ? 1 : 0, passageTarget, currentState]);
    }
    await makeRandomBasicChoice(currentText);
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}

// randomly choose one of the two generated options to continue
async function makeRandomBasicChoice(nextPassage) {
  if (firstRound(nextPassage)) {
    console.log("first round")
    await getNextTSLPassage.call({ innerHTML: nextPassage });
    return;
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
  const choice = options[Math.floor(Math.random() * 2)];
  await getNextBasicPassage.call({ innerHTML: choice });
}

async function getNextBasicPassage() {
    currentText = document.getElementById('adventureText').innerHTML.trim();
    console.log(this.innerHTML);
  
    let passagePrompt = [
      { role: "system", content: "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story of at most 100 words. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense. The player cannot visit a cave until they visit a town. The player cannot visit a cave until they visit a market. The player will eventually visit a town. The player will eventually visit a market. The player will eventually visit a cave. After the player visits a town and a market, they must visit a cave. The player may visit these locations in a later passage.",},
      { role: "assistant", content: storySummary + " " + currentText,},
      { role: "user", content: this.innerHTML.replace("You", "I"),},
    ];
  
    if (firstRound(currentText)) {
      passagePrompt[0].content += " Compose the introductory passage of the story which describes the character and the setting. The initial setting can not be in a market, town, or cave.";
    }

    inCave = preds[0];
    inMarket = preds[1];
    inTown = preds[2];

    console.log("inCave: " + inCave);
    console.log("inMarket: " + inMarket);
    console.log("inTown: " + inTown);

    // keep track if market and town were visited before cave
    if (inCave) {
      document.getElementById("caveCheck").checked = true;
    }
    if (inMarket) {
      document.getElementById("marketCheck").checked = true;
    }
    if (inTown) {
      document.getElementById("townCheck").checked = true;
    }
  
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
  