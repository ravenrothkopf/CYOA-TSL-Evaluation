document.getElementById('submitAPIKey').addEventListener("click", recordKey);
document.getElementById('choice1').addEventListener("click", getNextPassageAndChoices);
document.getElementById('choice2').addEventListener("click", getNextPassageAndChoices);
document.getElementById('checkInMarket').addEventListener("click", checkInMarket);


passages = []
storySummary = ""
const numPassagesToConsider = 3;

var apiKey = "";

function firstRound(currentText) {
  return currentText == "Once upon a time..."
}

function goToMarket(currentText) {
  return true
}

function recordKey() {
  // Get the value entered in the text input
  apiKey = document.getElementById("input_APIKey").value;
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

async function getChoices(nextPassage) {
  let choice1Prompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Given the passage, give a single next concrete action for the player, such as walking to the left. Refer to the reader as `You` and use the present active tense. Do not prefix options with numbers. Do not use the word `can`. Do not use the word `or`" }, //maybe ask for different kinds of options here - as mediated by TSL?
    { role: "user", content: nextPassage },
  ];
  let choice1;
  await openAIFetchAPI(choice1Prompt, 1, ".").then(userChoice => {
    document.getElementById('choice1').innerHTML = userChoice[0].message.content + ".";
    choice1 = userChoice[0].message.content + ".";
  })

  let choice2Prompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Given the passage, give a single next concrete action for the player, such as walking to the left. Refer to the reader as `You` and use the present active tense. Do not prefix options with numbers. Do not use the word `can`. Do not use the word `or`. The choice must be different from: `" + choice1 + "`."}, //maybe ask for different kinds of options here - as mediated by TSL?
    { role: "user", content: nextPassage },
  ];

  await openAIFetchAPI(choice2Prompt, 1, ".").then(userChoice => {
    document.getElementById('choice2').innerHTML = userChoice[0].message.content + ".";
  });
}

async function getNextPassageAndChoices() {
  const currentText = document.getElementById('adventureText').innerHTML.trim();
  document.getElementById('adventureText').innerHTML = "<div id=\"loading-bar-spinner\" class=\"spinner\"><div class=\"spinner-icon\"></div></div>";
  let passagePrompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense." },
    { role: "assistant", content: storySummary + " " + currentText },
    { role: "user", content: this.innerHTML.replace("You", "I") },
  ];

  if (firstRound(currentText)) {
    passagePrompt[0].content = passagePrompt[0].content + " Compose the introductory passage of the story which describes the character and the setting."
  }
  
  else if (goToMarket(currentText)) {
    passagePrompt[0].content = passagePrompt[0].content + " Compose a passage where the reader visits a market to buy supplies."
  }
  console.log(passagePrompt[0].content)


  openAIFetchAPI(passagePrompt, 1, "\n").then(newText => {
    let nextPassage = newText[0].message.content;
    document.getElementById('adventureText').innerHTML = nextPassage;
    document.getElementById('log').innerHTML += (this.innerHTML + "<br><br>" + nextPassage + "<br><br>");
    updateSummary(nextPassage).then(summary => {
      storySummary = summary;
      getChoices(nextPassage)
    });

  });
}


async function checkInMarket() {
  const currentText = document.getElementById('adventureText').innerHTML.trim();
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


}

async function openAIFetchAPI(promptMessages, numChoices, stopChars) {
  console.log("Calling GPT3")
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
      "max_tokens": 160,
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
