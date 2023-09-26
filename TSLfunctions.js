// global variables for TSL automaton predicates and functions
let toCave;
let toMarket;
let toTown;
let randomPassage;
let inCave;
let inMarket;
let inTown;

// compute all predicates ahead of time
function getMarket() {
  return inMarket;
}

function getTown() {
  return inTown;
}

function getCave() {
  return inCave;
}

let genericPrompt = "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story of at most 200 words. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense and never use the first-person."

//TSL functions of arity 1
async function market(summary, choice) {
  console.log("getting market passage...");
  let specificPrompt = " Compose a passage where the reader explores a market on their journey.";
  let passagePrompt = [
    { role: "system", content: genericPrompt + specificPrompt },
    { role: "assistant", content: summary + " " + currentText },
    { role: "user", content: choice },
  ];
  return await getAPIResponse(passagePrompt, false);
}

async function cave(summary, choice) {
  console.log("getting cave passage...");
  let specificPrompt = " Compose a passage where the reader explores a cave on their journey.";
  let passagePrompt = [
    { role: "system", content: genericPrompt + specificPrompt },
    { role: "assistant", content: summary + " " + currentText },
    { role: "user", content: choice },
  ];
  return await getAPIResponse(passagePrompt, false);
}

async function town(summary, choice) {
  console.log("getting town passage...");
  specificPrompt = " Compose a passage where the reader comes across a town on their journey.";
  let passagePrompt = [
    { role: "system", content: genericPrompt + specificPrompt },
    { role: "assistant", content: summary + " " + currentText },
    { role: "user", content: choice },
  ];
  return await getAPIResponse(passagePrompt, false);
}


//this doesnt work yet
async function updateSummary(previousSummary) {
  passages.push(previousSummary);
  let summaryPrompt = [
    { role: "system", content: "You are writing a book and need to recall important points of the story so far. Summarize the provided passage from about the story so far in moderate detail, including the main character description, the locations visited, items  acquired, and interactions with other characters." }, //maybe ask for different kinds of options here - as mediated by TSL?
    { role: "user", content: passages.slice(-numPassagesToConsider).join(' ') },
  ];
  return await getAPIResponse(summaryPrompt, false);
}

//TSL predicates
async function checkInMarket() {
  console.log("checking if in market...");
  let passagePrompt = [
    { role: "system", content: "Read this passage in an adventure story. Is the main character in a market or not? Respond '0' if it is false, or '1' if it is true." },
    { role: "user", content: passage },
  ];
  return await getAPIResponse(passagePrompt, true)
}

async function checkInCave() {
  console.log("checking if in cave...");
  let passagePrompt = [
    { role: "system", content: "Read this passage in an adventure story. Is the main character in a cave or not? Respond '0' if it is false, or '1' if it is true." },
    { role: "user", content: passage },
  ];
  return await getAPIResponse(passagePrompt, true)
}

async function checkInTown() {
  console.log("checking if in town...");
  let passagePrompt = [
    { role: "system", content: "Read this passage in an adventure story. Is the player in a town? Respond '0' if it is false, or '1' if it is true." },
    { role: "user", content: passage },
  ];
  return await getAPIResponse(passagePrompt, true)
}

async function getAPIResponse(prompt, isPredicate) {
  try {
    let newText = await openAIFetchAPI(prompt, 1, "\n");
    let response = newText[0].message.content;
    if (isPredicate) {
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
