document.getElementById('submitAPIKey').addEventListener("click", recordKey);
document.getElementById('choice1').addEventListener("click", getNextPassageAndChoices);
document.getElementById('choice2').addEventListener("click", getNextPassageAndChoices);
document.getElementById('checkInMarket').addEventListener("click", checkInMarket);


passages = []
storySummary = ""
const currentText = document.getElementById('adventureText').innerHTML.trim();
const numPassagesToConsider = 3;

var apiKey = "";

function recordKey() {
  // Get the value entered in the text input
  apiKey = document.getElementById("input_APIKey").value;
}

function firstRound(currentText) {
  return currentText == "Once upon a time..."
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
  document.getElementById('adventureText').innerHTML = "<div id=\"loading-bar-spinner\" class=\"spinner\"><div class=\"spinner-icon\"></div></div>";
  let passagePrompt = [
    { role: "system", content: "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense." },
    { role: "assistant", content: storySummary + " " + currentText },
    { role: "user", content: this.innerHTML.replace("You", "I") },
  ];

  let passage = passagePrompt[0].content

  if (firstRound(currentText)) {
    passage = passage + " Compose the introductory passage of the story which describes the character and the setting."
  }
  //this will eventually be mediated by TSL, insert automata here!
  passage = passage + goToMarket();

  //update passage prompt at the end
  passagePrompt[0].content = passage;
  openAIFetchAPI(passagePrompt, 1, "\n").then(newText => {
    let nextPassage = newText[0].message.content;
    document.getElementById('adventureText').innerHTML = nextPassage;
    document.getElementById('log').innerHTML += (this.innerHTML + "<br><br>" + nextPassage + "<br><br>");
    updateSummary(nextPassage).then(summary => {
      storySummary = summary;
      getChoices(nextPassage)
    });

  });
  if (isEnd(currentText)) {
    document.getElementById('adventureText').innerHTML += "<br><br> The End";
    document.getElementById('choice1').innerHTML = "";
    document.getElementById('choice2').innerHTML = "";
    document.getElementById('log').innerHTML = "";
    passages = [];
    storySummary = "";
  }
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
