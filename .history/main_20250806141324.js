// Event listeners
const choice1Btn = document.getElementById('choice1');
const choice2Btn = document.getElementById('choice2');
const restartBtn = document.getElementById('restart');
const submitBtn = document.getElementById('submitAPIKey');

choice1Btn.addEventListener("click", getNextPassage);
choice2Btn.addEventListener("click", getNextPassage);
restartBtn.addEventListener("click", restart);
submitBtn.addEventListener("click", init);

// Global state
let passages = [];
let preds = [];
let passage;
let storySummary = "";
let apiKey = "";
let selectedModel = "";

// Initialization: record API key + model, then test
function init() {
  apiKey = document.getElementById("input_APIKey").value.trim();
  selectedModel = document.getElementById('myDropdown').value;
  console.log("🔑 API key set, length =", apiKey.length);
  console.log("🤖 Model selected =", selectedModel);
  testAPIKey();
}

function firstRound(currentText) {
  return currentText === "Once upon a time...";
}

// PREDICATE SPECIFIC: compute obstacles
async function getPreds() {
  return await Promise.all([
    checkObstacle("cave"),
    checkObstacle("market"),
    checkObstacle("town"),
  ]);
}

async function getChoices(nextPassage) {
  let choice1;
  // Choice 1
  const choice1Prompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Given the passage, give a single next concrete action for the player, such as walking to the left. Refer to the reader as `You` and use the present active tense. Do not prefix options with numbers. Do not use the word `can`. Do not use the word `or`." },
    { role: "user", content: nextPassage },
  ];
  await openAIFetchAPI(choice1Prompt, 1, ".").then(userChoice => {
    choice1 = userChoice[0] + ".";
    document.getElementById('choice1').innerHTML = choice1;
  });

  // Choice 2
  const choice2Prompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Given the passage, give a single next concrete action for the player, such as walking to the left. Refer to the reader as `You` and use the present active tense. Do not prefix options with numbers. Do not use the word `can`. Do not use the word `or`. The choice must be a completely different concrete action from: '" + choice1 + "'" },
    { role: "user", content: nextPassage },
  ];
  await openAIFetchAPI(choice2Prompt, 1, ".").then(userChoice => {
    document.getElementById('choice2').innerHTML = userChoice[0] + ".";
  });
}

async function getNextPassage() {
  const intro = document.getElementById('adventureText').innerHTML.trim();
  document.getElementById('adventureText').innerHTML = "<img src='walk.gif' />";
  const userChoice = this.innerHTML.replace("You", "I");

  const passagePrompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story of at most 100 words. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense." },
    { role: "assistant", content: storySummary + " " + (passage || "") },
    { role: "user", content: userChoice },
  ];

  if (firstRound(intro)) {
    passagePrompt[0].content += " Compose the introductory passage of the story which describes the character and the setting. The initial setting can not be in a market, town, or cave.";
    await openAIFetchAPI(passagePrompt, 1, "\n").then(newText => {
      passage = newText[0];
      document.getElementById('adventureText').innerHTML = passage;
      document.getElementById('log').innerHTML += this.innerHTML + "<br><br>" + passage + "<br><br>";
      updateSummary(passage).then(summary => {
        storySummary = summary;
        getChoices(passage);
      });
    });
  } else {
    // predicate checks
    const [inCave, inMarket, inTown] = await getPreds();
    if (inCave) document.getElementById("caveCheck").checked = true;
    if (inMarket) document.getElementById("marketCheck").checked = true;
    if (inTown) document.getElementById("townCheck").checked = true;

    updateState();
    if (passageTarget === "toCave") {
      passage = await obstacle(storySummary, userChoice, "cave");
    } else if (passageTarget === "toMarket") {
      passage = await obstacle(storySummary, userChoice, "market");
    } else if (passageTarget === "toTown") {
      passage = await obstacle(storySummary, userChoice, "town");
    }

    document.getElementById('adventureText').innerHTML = passage;
    document.getElementById('log').innerHTML += userChoice + "<br><br>" + passage + "<br><br>";
    storySummary = await updateSummary(passage);
    getChoices(passage);
  }
}

function restart() {
  document.getElementById('adventureText').innerHTML = "Once upon a time...";
  document.getElementById('log').innerHTML = "";
  document.getElementById('choice1').innerHTML = "Start the adventure!";
  document.getElementById('choice2').innerHTML = "";
  passages = [];
  preds = [];
  storySummary = "";
  passage = "";
  currentState = 0;
  ['caveCheck','marketCheck','townCheck'].forEach(id => document.getElementById(id).checked = false);
  passageTarget = "toMarket";
}

async function openAIFetchAPI(promptMessages, numChoices = 1, stopSeqs = []) {
  if (!apiKey) throw new Error("No API key set – please enter one.");
  if (!selectedModel) throw new Error("No model selected – please choose a model from the dropdown.");

  console.log(`Calling ${selectedModel}…`);
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: selectedModel,
      messages: promptMessages,
      max_tokens: 250,
      temperature: 1,
      top_p: 1,
      n: numChoices,
      stop: Array.isArray(stopSeqs) ? stopSeqs : [stopSeqs]
    })
  });

  const payload = await res.json();
  if (!res.ok) {
    console.error("OpenAI error payload:", payload);
    throw new Error(payload.error?.message || "OpenAI request failed");
  }
  return payload.choices.map(c => c.message.content.trim());
}

async function testAPIKey() {
  try {
    console.log("🔍 Testing API key…");
    const prompt = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Give me one interesting fact about the Roman Empire." }
    ];
    const [fact] = await openAIFetchAPI(prompt, 1);
    console.log("API key works. Fact:", fact);
    document.getElementById('log').innerHTML += `<li><strong>API Test:</strong> ${fact}</li>`;
  } catch (err) {
    console.error("API Test failed:", err);
    document.getElementById('log').innerHTML += `<li style="color:red;"><strong>API Test failed:</strong> ${err.message}</li>`;
  }
}
function recordKey() {
  apiKey = document.getElementById("input_APIKey").value.trim();
  console.log("🔑 API key set, length =", apiKey.length);
  testAPIKey();
  // ← initialize the story state now that the key is in place
  restart();
}
