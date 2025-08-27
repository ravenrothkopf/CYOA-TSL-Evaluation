// Event listeners
const choice1Btn = document.getElementById('choice1');
const choice2Btn = document.getElementById('choice2');
const restartBtn = document.getElementById('restart');
const submitBtn  = document.getElementById('submitAPIKey');
const providerSelect = document.getElementById('providerSelect');
const modelSelect = document.getElementById('modelSelect');

choice1Btn.addEventListener("click", getNextPassage);
choice2Btn.addEventListener("click", getNextPassage);
restartBtn.addEventListener("click", restart);
submitBtn.addEventListener("click", recordKey);
providerSelect.addEventListener("change", updateModelDropdown);

// Global state
let passages       = [];
let preds          = [];
let passage;
let storySummary   = "";
// These need to be global for automata.js to access
var inCave         = false;
var inMarket       = false;
var inTown         = false;

// Utility to detect the very first "Once upon a time…" round
function firstRound(currentText) {
  return currentText === "Once upon a time...";
}

// PREDICATE: compute which locations we're in
async function getPreds() {
  return Promise.all([
    checkObstacle("cave"),
    checkObstacle("market"),
    checkObstacle("town"),
  ]);
}

// Generate the two green-button choices
async function getChoices(nextPassage) {
  showLoadingState();
  choice1Btn.innerHTML = `<img src='walk.gif' alt='Loading...' class='inline-block w-6 h-6 mr-2'>Generating choice...`;
  choice2Btn.innerHTML = `<img src='walk.gif' alt='Loading...' class='inline-block w-6 h-6 mr-2'>Generating choice...`;
  choice2Btn.classList.remove('hidden');
  
  let choice1, choice2;
  
  // If we have a passage target from TSL, use it to guide choices
  console.log(`[Choice Generation] Current TSL target: ${passageTarget}`);
  
  if (passageTarget === "toCave" || passageTarget === "toMarket" || passageTarget === "toTown") {
    const targetLocation = passageTarget === "toCave" ? "cave" : 
                          passageTarget === "toMarket" ? "market" : 
                          passageTarget === "toTown" ? "town" : null;
    
    if (targetLocation) {
      // Choice 1: Go to the target location
      const choice1Prompt = [
        { role: "system", content: `You are writing a choice for a CYOA story. Write ONE SHORT action (5-10 words) that will directly take the player TO or INTO the ${targetLocation}. Examples: "Enter the bustling ${targetLocation}" or "Walk into the ${targetLocation}" or "Step through the ${targetLocation} entrance". Be direct and clear!` },
        { role: "user", content: nextPassage },
      ];
      const [c1] = await apiClient.makeRequest(choice1Prompt, { stopSequences: ["."] });
      choice1 = c1 + ".";
      
      // Update choice 1 button immediately when ready
      choice1Btn.textContent = choice1;
      choice1Btn.classList.remove('opacity-50', 'cursor-not-allowed');
      choice1Btn.disabled = false;
      
      // Choice 2: Alternative action
      const choice2Prompt = [
        { role: "system", content: "You are writing choices for a CYOA story. Write ONE SHORT action (5-10 words) different from: '" + choice1 + "'. Start with an action verb. Use 'You' and present tense. Be concise!" },
        { role: "user", content: nextPassage },
      ];
      const [c2] = await apiClient.makeRequest(choice2Prompt, { stopSequences: ["."] });
      choice2 = c2 + ".";
      
      // Update choice 2 button when ready
      choice2Btn.textContent = choice2;
      choice2Btn.classList.remove('opacity-50', 'cursor-not-allowed');
      choice2Btn.disabled = false;
    } else {
      // Fallback to normal choice generation
      await generateNormalChoices(nextPassage);
      return;
    }
  } else {
    // Normal choice generation when no TSL target
    await generateNormalChoices(nextPassage);
    return;
  }
}

async function generateNormalChoices(nextPassage) {
  // Choice 1
  const choice1Prompt = [
    { role: "system", content: "You are writing choices for a CYOA story. Write ONE SHORT action (5-10 words) the player could take next. Start with an action verb. Use 'You' and present tense. Be concise!" },
    { role: "user", content: nextPassage },
  ];
  const [c1] = await apiClient.makeRequest(choice1Prompt, { stopSequences: ["."] });
  const choice1 = c1 + ".";
  
  // Update choice 1 button immediately when ready
  choice1Btn.textContent = choice1;
  choice1Btn.classList.remove('opacity-50', 'cursor-not-allowed');
  choice1Btn.disabled = false;

  // Choice 2
  const choice2Prompt = [
    { role: "system", content: "You are writing choices for a CYOA story. Write ONE SHORT action (5-10 words) different from: '" + choice1 + "'. Start with an action verb. Use 'You' and present tense. Be concise!" },
    { role: "user", content: nextPassage },
  ];
  const [c2] = await apiClient.makeRequest(choice2Prompt, { stopSequences: ["."] });
  
  // Update choice 2 button when ready
  choice2Btn.textContent = c2 + ".";
  choice2Btn.classList.remove('opacity-50', 'cursor-not-allowed');
  choice2Btn.disabled = false;
}

// Core loop: run when either green button is clicked
async function getNextPassage() {
  console.log("➡️ getNextPassage() fired");
  try {
    let userChoice = this.textContent.trim();
    console.log("   userChoice =", userChoice);
    
    // Show loading animation in both buttons immediately
    choice1Btn.innerHTML = `<img src='walk.gif' alt='Loading...' class='inline-block w-6 h-6 mr-2'>Generating choice...`;
    choice2Btn.innerHTML = `<img src='walk.gif' alt='Loading...' class='inline-block w-6 h-6 mr-2'>Generating choice...`;
    choice1Btn.disabled = true;
    choice2Btn.disabled = true;
    choice1Btn.classList.add('opacity-50', 'cursor-not-allowed');
    choice2Btn.classList.add('opacity-50', 'cursor-not-allowed');

    const advEl = document.getElementById('adventureText');
    advEl.innerHTML = `<div class='flex flex-col items-center justify-center'>
      <img src='walk.gif' alt='Loading...' class='w-16 h-16 mb-2'>
      <em class='text-amber-600 animate-pulse'>Weaving the next chapter of your tale...</em>
    </div>`;

    // First intro vs. subsequent
    let newPara;
    const isFirstRound = firstRound(advEl.textContent.trim().replace(/Weaving.*/, 'Once upon a time...'));
    
    if (isFirstRound) {
      // Set initial TSL target
      passageTarget = "toMarket";
      document.getElementById('tslStatus').innerHTML = `TSL Target: <span class="font-semibold">🔜 Market</span> (State: 0)`;
      
      // Initial scene
      const basePrompt = [
        { role: "system", content: "You are writing a CYOA story. Write ONE paragraph (100-150 words) that sets up a situation requiring a decision. End at a moment of tension or uncertainty WITHOUT stating what the choices are. The scene should create anticipation for what could happen next. This is the opening scene (not in a cave/market/town). Keep it concise!" },
        { role: "assistant", content: storySummary + " " + (passage || "") },
        { role: "user", content: userChoice }
      ];
      [newPara] = await apiClient.makeRequest(basePrompt, { stopSequences: ["\n"] });
    } else {
      // Check if we should guide to TSL target based on current state
      let shouldNavigateToTarget = false;
      let targetLocation = null;
      
      // Check what the CURRENT passageTarget is (before we've updated state)
      if (passageTarget === "toCave" || passageTarget === "toMarket" || passageTarget === "toTown") {
        targetLocation = passageTarget === "toCave" ? "cave" : 
                        passageTarget === "toMarket" ? "market" : 
                        passageTarget === "toTown" ? "town" : null;
        
        // Check if we're not already at the target location
        const alreadyAtTarget = (targetLocation === "cave" && inCave) ||
                               (targetLocation === "market" && inMarket) ||
                               (targetLocation === "town" && inTown);
        
        console.log(`[Navigation Check] Target: ${targetLocation}, Already there: ${alreadyAtTarget}`);
        
        if (targetLocation && !alreadyAtTarget) {
          // Check if user choice seems to be heading toward the target
          // Be VERY lenient - any action-oriented choice should guide to target if TSL wants it
          const actionWords = ["enter", "walk", "step", "go", "head", "follow", "approach", 
                              "investigate", "explore", "continue", "proceed", "venture", 
                              "move", "travel", "journey", "make your way"];
          const hasActionWord = actionWords.some(word => userChoice.toLowerCase().includes(word));
          
          // If TSL has a target and user picked ANY action choice, guide them there
          if (userChoice.toLowerCase().includes(targetLocation) || hasActionWord) {
            shouldNavigateToTarget = true;
            console.log(`[TSL Navigation] WILL guide to ${targetLocation} based on choice: "${userChoice}"`);
          } else {
            console.log(`[TSL Navigation] NOT guiding to ${targetLocation} - choice doesn't seem action-oriented: "${userChoice}"`);
          }
        }
      }
      
      if (shouldNavigateToTarget && targetLocation) {
        // TSL-guided passage to specific location
        const guidedPrompt = [
          { role: "system", content: `You are writing a CYOA story. Write ONE paragraph (100-150 words). IMPORTANT: The player MUST arrive at and BE INSIDE the ${targetLocation} by the middle of the paragraph. Describe them entering the ${targetLocation}, what they see inside, and end with them facing a decision while IN the ${targetLocation}. Do not just approach it - they must GO IN.` },
          { role: "assistant", content: storySummary + " " + (passage || "") },
          { role: "user", content: userChoice }
        ];
        [newPara] = await apiClient.makeRequest(guidedPrompt, { stopSequences: ["\n"] });
        console.log(`Generated TSL-guided passage to ${targetLocation}`);
      } else {
        // Normal passage generation
        const basePrompt = [
          { role: "system", content: "You are writing a CYOA story. Write ONE paragraph (100-150 words) that naturally follows from the player's action. End at a moment of decision or uncertainty WITHOUT explicitly stating choices. The ending should create anticipation - perhaps the character notices something, hears something, or faces a dilemma. Keep it concise!" },
          { role: "assistant", content: storySummary + " " + (passage || "") },
          { role: "user", content: userChoice }
        ];
        [newPara] = await apiClient.makeRequest(basePrompt, { stopSequences: ["\n"] });
      }
    }
    
    // Update passage and check predicates
    passage = newPara;
    
    // After generating the passage, check where we are
    const [c, m, t] = await getPreds();
    inCave = c; 
    inMarket = m; 
    inTown = t;
    
    // Update checkboxes to show current location
    document.getElementById('caveCheck').checked = inCave;
    document.getElementById('marketCheck').checked = inMarket;
    document.getElementById('townCheck').checked = inTown;
    
    // Update state machine for next transition
    // Always update state machine to determine next target
    const oldTarget = passageTarget;
    console.log(`BEFORE updateState: State=${currentState}, Target=${passageTarget}`);
    console.log(`Current locations: Cave=${inCave}, Market=${inMarket}, Town=${inTown}`);
    
    updateState();  // sets passageTarget for next round (may keep same value intentionally)
    
    console.log(`AFTER updateState: State=${currentState}, Target=${passageTarget}`);
    
    // Update TSL status display
    const targetDisplay = passageTarget === "toCave" ? "🔜 Cave" : 
                         passageTarget === "toMarket" ? "🔜 Market" : 
                         passageTarget === "toTown" ? "🔜 Town" : 
                         "Exploring...";
    document.getElementById('tslStatus').innerHTML = `TSL Target: <span class="font-semibold">${targetDisplay}</span> (State: ${currentState})`;

    // Display result with animation
    setTimeout(() => {
      advEl.style.opacity = '0';
      setTimeout(() => {
        advEl.textContent = passage;
        advEl.style.opacity = '1';
        advEl.style.transition = 'opacity 0.5s ease-in';
      }, 200);
    }, 100);
    
    // Update log with better formatting
    const logEl = document.getElementById('log');
    logEl.innerHTML += `
      <li class="border-l-4 border-emerald-500 pl-3">
        <span class="font-semibold text-emerald-700">Your Choice:</span>
        <span class="text-gray-700">${userChoice}</span>
      </li>
      <li class="border-l-4 border-amber-500 pl-3 mt-2">
        <span class="font-semibold text-amber-700">The Story Unfolds:</span>
        <p class="text-gray-700 mt-1">${passage}</p>
      </li>`;
    logEl.scrollTop = logEl.scrollHeight;

    // Update summary & regenerate choices
    storySummary = await updateSummary(passage);
    await getChoices(passage);
    console.log("   new choices rendered.");

  } catch (err) {
    console.error("❌ Error in getNextPassage:", err);
    document.getElementById('adventureText').innerHTML =
      `<span class="text-red-600">😔 Sorry, something went wrong: ${err.message}</span>`;
  }
}

// Bring everything back to the start
function restart() {
  document.getElementById('adventureText').textContent = "Once upon a time...";
  document.getElementById('log').innerHTML            = "";
  choice1Btn.textContent                               = "Start the adventure!";
  choice2Btn.textContent                               = "";
  choice2Btn.classList.add('hidden');
  choice1Btn.disabled = false;
  choice2Btn.disabled = false;
  choice1Btn.classList.remove('opacity-50', 'cursor-not-allowed');
  choice2Btn.classList.remove('opacity-50', 'cursor-not-allowed');
  passages = []; preds = []; storySummary = ""; passage = "";
  inCave = false; inMarket = false; inTown = false;
  currentState = 0;
  ['caveCheck','marketCheck','townCheck'].forEach(id => 
    document.getElementById(id).checked = false
  );
  passageTarget = "toMarket";
  document.getElementById('tslStatus').innerHTML = `TSL Target: <span class="font-semibold">🔜 Market</span> (Initial)`;
}

// Helper functions
function showLoadingState() {
  choice1Btn.disabled = true;
  choice2Btn.disabled = true;
  choice1Btn.classList.add('opacity-50', 'cursor-not-allowed');
  choice2Btn.classList.add('opacity-50', 'cursor-not-allowed');
}

function updateModelDropdown() {
  const provider = providerSelect.value;
  const models = CONFIG[provider].models;
  
  modelSelect.innerHTML = '<option value="">Select a model...</option>';
  models.forEach(model => {
    const option = document.createElement('option');
    option.value = model.id;
    option.textContent = model.name;
    modelSelect.appendChild(option);
  });
}

// Called when you click "Submit"
function recordKey() {
  const apiKeyInput = document.getElementById("input_APIKey").value.trim();
  const selectedModel = modelSelect.value;
  const provider = providerSelect.value;
  
  if (!apiKeyInput) {
    alert('Please enter your API key');
    return;
  }
  
  if (!selectedModel) {
    alert('Please select a model');
    return;
  }
  
  apiClient.setProvider(provider);
  apiClient.setApiKey(apiKeyInput);
  apiClient.setModel(selectedModel);
  
  console.log(`🔑 API key set for ${provider}, length =`, apiKeyInput.length);
  console.log(`🤖 Model selected = ${selectedModel}`);
  
  // Show success feedback
  submitBtn.textContent = '✓ Ready!';
  submitBtn.classList.add('bg-green-600');
  setTimeout(() => {
    submitBtn.textContent = 'Start Adventure';
    submitBtn.classList.remove('bg-green-600');
  }, 2000);
  
  restart();
}

// Initialize model dropdown on load
window.addEventListener('DOMContentLoaded', () => {
  updateModelDropdown();
  // Initialize TSL display
  document.getElementById('tslStatus').innerHTML = `TSL Target: <span class="font-semibold">Ready to start</span>`;
});