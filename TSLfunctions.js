//TSL functions of arity 0
function toMarket() {
  return " Compose a passage where the reader visits a market to buy supplies."
}

function toCave() {
  return " Compose a passage where the reader explores a cave on their journey."
}

function toTown() {
  return " Compose a passage where the reader explores a cave on their journey."
}

//this doesnt work yet
async function updateSummary(previousSummary) {
  passages.push(previousSummary);
  let summaryPrompt = [
    { role: "system", content: "You are writing a book and need to recall important points of the story so far. Summarize the provided passages into a list of key facts about the story so far." }, //maybe ask for different kinds of options here - as mediated by TSL?
    { role: "user", content: passages.slice(-numPassagesToConsider).join(' ') },
  ];
  return openAIFetchAPI(summaryPrompt, 1, "");
}

//TSL predicates
async function inMarket(summary) {
    let inMarket = false;
    let passagePrompt = [
      { role: "system", content: "Read this passage in an adventure story. Is the main character in a market or not? Respond '0' if it is false, or '1' if it is true." },
      { role: "user", content: summary},
    ];
  
    console.log("[checkInMarket] "+ passagePrompt[0].content)
  
    openAIFetchAPI(passagePrompt, 1, ".").then(newText => {
      let response = newText[0].message.content;
      inMarket = response.includes("1");
  
      // update the text
      document.getElementById("inMarketResult").innerHTML = "In Market? "+inMarket;
    });
    return inMarket;
  }
  
  async function inCave(summary) {
    let inCave = false;
    let passagePrompt = [
      { role: "system", content: "Read this passage in an adventure story. Is the main character in a cave or not? Respond '0' if it is false, or '1' if it is true." },
      { role: "user", content: summary},
    ];
  
    console.log("[checkInCave] "+ passagePrompt[0].content)
  
    openAIFetchAPI(passagePrompt, 1, ".").then(newText => {
      let response = newText[0].message.content;
      inCave = response.includes("1");
  
      // update the text
      document.getElementById("inCaveResult").innerHTML = "In Cave? "+inCave;
    });
    return inCave;
  }

  async function inTown(summary) {
    let inTown = false;
    let passagePrompt = [
      { role: "system", content: "Read this passage in an adventure story. Is the player in a town? Respond '0' if it is false, or '1' if it is true." },
      { role: "user", content: summary},
    ];
  
    console.log("[checkTown] "+ passagePrompt[0].content)
  
    openAIFetchAPI(passagePrompt, 1, ".").then(newText => {
      let response = newText[0].message.content;
      inTown = response.includes("1");
  
      // update the text
      document.getElementById("inTownResult").innerHTML = "In Town? "+inTown;
    });
    return inTown;
  }