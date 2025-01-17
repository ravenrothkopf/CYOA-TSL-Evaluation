document.getElementById('submitAPIKey').addEventListener("click", recordKey);
document.getElementById('restart').addEventListener("click", restart);
document.getElementById('stopGame').addEventListener("click", stopGame);
document.getElementById('runGame').addEventListener("click", () => {
  console.log("Run " + runs)
  runGame();
});

// list of all passages for summarization
let passages = [];
let preds = [];
// global variable for the current passage of each time step
let passage;
let currentText;
let storySummary = ""
let isRunning = true;
let runs = 1;
let choice = "";
var apiKey = "";

// log predicates for each time step for each run
createCSVFile();

function recordKey() {
  // Get the value entered in the text input
  apiKey = document.getElementById("input_APIKey").value;
}

function firstRound(currentText) {
  return currentText == "Once upon a time..."
}

// run the game for 20 steps
async function runGame() {
  for (let step = 0; step < 15; step++) {
    if (!isRunning) {
      console.log("stopped game")
      break;
    }
    console.log("step: " + step)
    currentText = document.getElementById('adventureText').innerHTML.trim();

    // PREDICATE SPECIFIC
    updateForest();
    // if (firstRound(currentText)) {
    //   appendToCSVFile([runs, step, 0, 0, 0, 0, passageTarget, currentState, 0, 0]);
    // }
    // compute all predicates ahead of time for the sake of efficiency and money
    choice = await makeRandomChoice(currentText);
    await getNextTSLPassage.call({ innerHTML: choice });
    preds = await getPreds();
    inCave = preds[0];
      inMarket = preds[1];
      inTown = preds[2];
      inForest = preds[3];

      console.log("inCave: " + inCave);
      console.log("inMarket: " + inMarket);
      console.log("inTown: " + inTown);
      console.log("inForest: " + inForest);

      choice = choice.replace("You", "I");
      // safeChoice = await evalChoice(storySummary, choice);

      // console.log("safe: " + safeChoice);
      // console.log("safe count: " + safeCount);

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
      if (inForest) {
        document.getElementById("forestCheck").checked = true;
      }
      updateCSVFile([runs, step, preds[0] ? 1 : 0, preds[1] ? 1 : 0, preds[2] ? 1 : 0, preds[3] ? 1 : 0, passageTarget, currentState, safeChoice ? 1 : 0, safeCount]);

    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  console.log("finished game");
}

function stopGame() {
  isRunning = false;
}

// PREDICATE SPECIFIC
// compute all predicates ahead of time
async function getPreds() {
  let preds = [];
  if (inCave){
    preds.push(true);
    preds = preds.concat(await Promise.all([
      checkObstacle("market"),
      checkObstacle("town"),
      checkObstacle("forest"),
    ]));
  }
  else {
    preds = await Promise.all([
      checkObstacle("cave"),
      checkObstacle("market"),
      checkObstacle("town"),
      checkObstacle("forest"),
    ]);
  }
  return preds;
}

// randomly choose one of the two generated options to continue
async function makeRandomChoice(nextPassage) {
  if (nextPassage.includes("Once upon a time") || nextPassage.includes("once upon a time")) {
    console.log("first round")
    // await getNextTSLPassage.call({ innerHTML: nextPassage });
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

  console.log("choice1: " + choice1);
  console.log("choice2: " + choice2);

  const options = [choice1, choice2]; //randomly choose one of the two options
  return options[Math.floor(Math.random() * 2)];
  // await getNextTSLPassage.call({ innerHTML: choice });
  // " Compose the introductory passage of the story which describes the character and the setting. The initial setting can not be in a market, town or cave."
}

async function getNextTSLPassage() {
  currentText = document.getElementById('adventureText').innerHTML.trim();
  console.log(this.innerHTML)
      // PREDICATE SPECIFIC
      // -----------------

      console.log(passageTarget)
      while (passageTarget === "toCave" && !inCave) {
        passage = await obstacle(storySummary, choice, "cave");
        inCave = await checkObstacle("cave");
        console.log("inCave: " + inCave);
      }
      if (passageTarget == "toCave") {
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
      if (passageTarget == "toMarket") {
        console.log("TSL says go to market")
        passage = await obstacle(storySummary, choice, "market")
      }
      else if (passageTarget == "toTown") {
        console.log("TSL says go to town")
        passage = await obstacle(storySummary, choice, "town")
      }
      else if (passageTarget == "toForest") {
        console.log("TSL says go to forest")
        passage = await obstacle(storySummary, choice, "forest")
      }

      // -----------------

      // update story summary and choices
      document.getElementById('adventureText').innerHTML = passage;
      document.getElementById('log').innerHTML += (this.innerHTML + "<br><br>" + passage + "<br><br>");
      await updateSummary(passage).then(summary => {
        storySummary = summary;
        console.log("Current state: " + currentState);
        console.log("Generated passage: " + passage);
        console.log("Updated summary: " + storySummary);
      });
  }

function restart() {
  document.getElementById('adventureText').innerHTML = "Once upon a time...";
  document.getElementById('log').innerHTML = "";

  currentText = "";
  passages = [];
  preds = [];
  storySummary = "";
  currentState = 0;
  passage = "";
  isRunning = true;
  currentState = 0;
  safeCount = 0;
  runs++;

  //PREDICATE SPECIFIC
  // -----------------
  document.getElementById('caveCheck').checked = false;
  document.getElementById('marketCheck').checked = false;
  document.getElementById('townCheck').checked = false;
  document.getElementById('forestCheck').checked = false;

  passageTarget = "";

  toCave = "toCave";
  toMarket = "toMarket";
  toTown = "toTown";
  toForest = "toForest";

  inCave = false;
  inMarket = false;
  inTown = false;
  safeChoice = false;
  // -----------------
}

async function openAIFetchAPI(promptMessages, numChoices, stopChars) {
  console.log("Calling GPT4")
  const url = "https://api.openai.com/v1/chat/completions";
  const YOUR_TOKEN = apiKey //add your own openai api key
  const bearer = 'Bearer ' + YOUR_TOKEN
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "model": "gpt-4",
      "messages": promptMessages,
      "max_tokens": 250,
      "temperature": 1,
      "top_p": 1,
      "n": numChoices,
      "stream": false,
      "stop": stopChars
    })
  }).then(response => {
    return response.json()
  });
  return data['choices'];
}