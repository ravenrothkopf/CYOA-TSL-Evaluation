// global variables for TSL automaton predicates and functions
let toCave;
let toMarket;
let toTown;
let randomPassage;
let inCave;
let inMarket;
let inTown;

// compute all predicates ahead of time
function getMarket(){
  return inMarket;
}

function getTown(){
  return inTown;
}

function getCave(){
  return inCave;
}


//TSL functions of arity 1
async function market(summary, choice) {
  console.log("getting market passage...");
  summary += " Compose a passage where the reader explores a market on their journey.";
  let passagePrompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense." },
    { role: "assistant", content: storySummary + " " + currentText },
    { role: "user", content: choice },
  ];
  passagePrompt[0].content += summary;
  return await getAPIResponse(passagePrompt, false);
}

async function cave(summary, choice) {
  console.log("getting cave passage...");
  summary += " Compose a passage where the reader explores a cave on their journey.";
  let passagePrompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense." },
    { role: "assistant", content: storySummary + " " + currentText },
    { role: "user", content: choice },
  ];
  passagePrompt[0].content += summary;
  return await getAPIResponse(passagePrompt, false);
}

async function town(summary, choice) {
  console.log("getting town passage...");
  summary += " Compose a passage where the reader comes across a town on their journey.";
  let passagePrompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense." },
    { role: "assistant", content: storySummary + " " + currentText },
    { role: "user", content: choice },
  ];
  passagePrompt[0].content += summary;
  return await getAPIResponse(passagePrompt, false);
}

async function getRandomPassage(summary, choice) {
  console.log("getting random passage...");
  summary += " Compose a passage where the reader continues their journey. They can not encounter a cave.";
  let passagePrompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense." },
    { role: "assistant", content: storySummary + " " + currentText },
    { role: "user", content: choice },
  ];
  passagePrompt[0].content += summary;
  return await getAPIResponse(passagePrompt, false);
}

//this doesnt work yet
async function updateSummary(previousSummary) {
  passages.push(previousSummary);
  let summaryPrompt = [
    { role: "system", content: "You are writing a book and need to recall important points of the story so far. Summarize the provided passages into a list of key facts about the story so far in moderate detail, including locations the player has visited, items they have aquired, and people they have interacted with." }, //maybe ask for different kinds of options here - as mediated by TSL?
    { role: "user", content: passages.slice(-numPassagesToConsider).join(' ') },
  ];
  return await getAPIResponse(summaryPrompt, false);
}

//TSL predicates
async function checkInMarket() {
    console.log("checking if in market...");
    let passagePrompt = [
      { role: "system", content: "Read this passage in an adventure story. Is the main character in a market or not? Respond '0' if it is false, or '1' if it is true." },
      { role: "user", content: passage},
    ];
    return await getAPIResponse(passagePrompt, true)
  }
  
  async function checkInCave() {
    console.log("checking if in cave...");
    let passagePrompt = [
      { role: "system", content: "Read this passage in an adventure story. Is the main character in a cave or not? Respond '0' if it is false, or '1' if it is true." },
      { role: "user", content: passage},
    ];
    return await getAPIResponse(passagePrompt, true)
  }

  async function checkInTown() {
    console.log("checking if in town...");
    let passagePrompt = [
      { role: "system", content: "Read this passage in an adventure story. Is the player in a town? Respond '0' if it is false, or '1' if it is true." },
      { role: "user", content: passage},
    ];
    return await getAPIResponse(passagePrompt, true)
  }

async function getAPIResponse(prompt, isPredicate){
  try {
    let newText = await openAIFetchAPI(prompt, 1, "\n");
    let response = newText[0].message.content;
    if (isPredicate){
      let pred = response.includes("1");
      return pred;
    }
    else {
      return response;
    }
  } catch (error) {
    console.error("Error determining town state:", error);
    return null; 
  }
}
