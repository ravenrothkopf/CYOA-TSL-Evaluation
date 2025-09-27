// Event listeners
const choice1Btn = document.getElementById('choice1');
const choice2Btn = document.getElementById('choice2');
const restartBtn = document.getElementById('restart');
const submitBtn  = document.getElementById('submitAPIKey');

choice1Btn.addEventListener("click", getNextPassage);
choice2Btn.addEventListener("click", getNextPassage);
restartBtn.addEventListener("click", restart);
submitBtn.addEventListener("click", recordKey);

// Global state
let passages       = [];
let preds          = [];
let passage;
let storySummary   = "";
let apiKey         = "";
let selectedModel  = "";

// Utility to detect the very first “Once upon a time…” round
function firstRound(currentText) {
  return currentText === "Once upon a time...";
}

// PREDICATE: compute which locations we’re in
async function getPreds() {
  return Promise.all([
    checkObstacle("cave"),
    checkObstacle("market"),
    checkObstacle("town"),
  ]);
}

// Generate the two green-button choices
async function getChoices(nextPassage) {
  let choice1;
  // Choice 1
  const choice1Prompt = [
    { role: "system", content: "You are writing a choose-your-own-adventure book. Given the passage, give one next concrete action for the player, such as walking to the left. Refer to the reader as `You` and use the present active tense. Do not prefix options with numbers or use the words `can` or `or`." },
    { role: "user",   content: nextPassage },
  ];
  await openAIFetchAPI(choice1Prompt, 1, ".").then(userChoice => {
    choice1 = userChoice[0] + ".";
    choice1Btn.textContent = choice1;
  });

  // Choice 2
  const choice2Prompt = [
    { role: "system", content: "You are writing a choose-your-own-adventure book. Given the passage, give one next concrete action for the player, such as walking to the left. Refer to the reader as `You` and use the present active tense. Do not prefix options with numbers or use the words `can` or `or`. The choice must be a completely different action from: '" + choice1 + "'" },
    { role: "user",   content: nextPassage },
  ];
  await openAIFetchAPI(choice2Prompt, 1, ".").then(userChoice => {
    choice2Btn.textContent = userChoice[0] + ".";
  });
}

// Core loop: run when either green button is clicked


// Bring everything back to the start
function restart() {
  document.getElementById('adventureText').textContent = "Once upon a time...";
  document.getElementById('log').innerHTML            = "";
  choice1Btn.textContent                               = "Start the adventure!";
  choice2Btn.textContent                               = "";
  passages = []; preds = []; storySummary = ""; passage = "";
  currentState = 0;
  ['caveCheck','marketCheck','townCheck'].forEach(id => 
    document.getElementById(id).checked = false
  );
  passageTarget = "toMarket";
}

// Low‐level OpenAI call
async function openAIFetchAPI(promptMessages, numChoices = 1, stopSeqs = []) {
  if (!apiKey)        throw new Error("No API key set – please enter one.");
  if (!selectedModel) throw new Error("No model selected – please choose one.");

  console.log(`Calling ${selectedModel}…`);
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model:       selectedModel,
      messages:    promptMessages,
      max_tokens:  250,
      temperature: 1,
      top_p:       1,
      n:           numChoices,
      stop:        Array.isArray(stopSeqs) ? stopSeqs : [stopSeqs]
    })
  });

  const payload = await res.json();
  if (!res.ok) {
    console.error("OpenAI error payload:", payload);
    throw new Error(payload.error?.message || "OpenAI request failed");
  }
  return payload.choices.map(c => c.message.content.trim());
}

// Called when you click “Submit”
function recordKey() {
  apiKey        = document.getElementById("input_APIKey").value.trim();
  selectedModel = document.getElementById("myDropdown").value;
  console.log("🔑 API key set, length =", apiKey.length);
  console.log("🤖 Model selected =", selectedModel);
  restart();
}
