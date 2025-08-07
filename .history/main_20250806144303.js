// Event listeners

const choice1Btn = document.getElementById('choice1');
const choice2Btn = document.getElementById('choice2');
const restartBtn = document.getElementById('restart');
const submitBtn = document.getElementById('submitAPIKey');

choice1Btn.addEventListener("click", getNextPassage);
choice2Btn.addEventListener("click", getNextPassage);
restartBtn.addEventListener("click", restart);
submitBtn.addEventListener("click", recordKey);


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
  console.log("➡️ getNextPassage() fired");
  try {
    // 1) Grab the user’s click text
    let userChoice = this.textContent.trim();
    console.log("   userChoice =", userChoice);

    // 2) Show a loading indicator
    const advEl = document.getElementById('adventureText');
    advEl.innerHTML = "<em>Loading next passage…</em>";

    // 3) Build your prompt array
    const basePrompt = [
      {
        role: "system",
        content: "You are writing a CYOA one‐paragraph scene. Stop right before the next choice."
      },
      { role: "assistant", content: storySummary + " " + (passage || "") },
      { role: "user",      content: userChoice }
    ];

    // 4) Fire off the LLM
    console.log("   sending prompt to OpenAI…");
    const [newPara] = await openAIFetchAPI(basePrompt, 1, "\n");
    console.log("   received:", newPara);

    // 5) Update globals & DOM
    passage = newPara;
    advEl.textContent = passage;
    document.getElementById('log').innerHTML +=
      `<li><strong>You:</strong> ${userChoice}</li>
       <li><strong>Story:</strong> ${passage}</li>`;

    // 6) Roll up your summary
    storySummary = await updateSummary(passage);
    console.log("   storySummary now:", storySummary);

    // 7) Regenerate the two choices
    await getChoices(passage);
    console.log("   new choices rendered.");

  } catch (err) {
    console.error("❌ Error in getNextPassage:", err);
    document.getElementById('adventureText').textContent =
      "Sorry, something went wrong: " + err.message;
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
  selectedModel = document.getElementById("myDropdown").value;
  console.log("🔑 API key set, length =", apiKey.length);
  console.log("🤖 Model selected =", selectedModel);
  testAPIKey();
  restart();
}
