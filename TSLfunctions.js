//TSL functions of arity 0
function goToMarket() {
  return " Compose a passage where the reader visits a market to buy supplies."
}

function goToCave() {
  return " Compose a passage where the reader explores a cave on their journey."
}

function endGame() {
  return " Compose a passage that ends the current story that the player is following."
}

//this doesnt work yet
async function updateSummary(nextPassage) {
  passages.push(nextPassage);
  let summaryPrompt = [
    { role: "system", content: "You are writing a book and need to recall important points of the story so far. Summarize the provided passages into a list of key facts about the story so far." }, //maybe ask for different kinds of options here - as mediated by TSL?
    { role: "user", content: passages.slice(-numPassagesToConsider).join(' ') },
  ];
  return openAIFetchAPI(summaryPrompt, 1, "");
}

//TSL predicates
async function inMarket(currentText) {
    let inMarket = false;
    let passagePrompt = [
      { role: "system", content: "Read this passage in an adventure story. Is the main character in a market or not? Respond '0' if it is false, or '1' if it is true." },
      { role: "user", content: currentText},
    ];
  
    console.log("[checkInMarket] "+ passagePrompt[0].content)
  
    openAIFetchAPI(passagePrompt, 1, ".").then(newText => {
      let response = newText[0].message.content;
      let inMarket = response.includes("1");
  
      // update the text
      document.getElementById("inMarketResult").innerHTML = "In Market? "+inMarket;
    });
    return inMarket;
  }
  
  async function inCave(currentText) {
    let inCave = false;
    let passagePrompt = [
      { role: "system", content: "Read this passage in an adventure story. Is the main character in a cave or not? Respond '0' if it is false, or '1' if it is true." },
      { role: "user", content: currentText},
    ];
  
    console.log("[checkInCave] "+ passagePrompt[0].content)
  
    openAIFetchAPI(passagePrompt, 1, ".").then(newText => {
      let response = newText[0].message.content;
      let inCave = response.includes("1");
  
      // update the text
      document.getElementById("inCaveResult").innerHTML = "In Cave? "+inCave;
    });
    return inCave;
  }

  async function isEnd(currentText) {
    let isEnd = false;
    let passagePrompt = [
      { role: "system", content: "Read this passage in an adventure story. Is this the end of a story? Respond '0' if it is false, or '1' if it is true." },
      { role: "user", content: currentText},
    ];
  
    console.log("[checkEnd] "+ passagePrompt[0].content)
  
    openAIFetchAPI(passagePrompt, 1, ".").then(newText => {
      let response = newText[0].message.content;
      isEnd = response.includes("1");
  
      // update the text
      document.getElementById("isEndResult").innerHTML = "End game? "+isEnd;
    });
    return isEnd;
  }