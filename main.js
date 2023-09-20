document.getElementById('choice1').addEventListener("click", getNextPassageAndChoices);
document.getElementById('choice2').addEventListener("click", getNextPassageAndChoices);

async function getNextPassageAndChoices() {
 	const currentText = document.getElementById('adventureText').innerHTML;
	let passagePrompt = [
  	{role: "system", content: "You are writing a choose your own adventure book. Compose a passage of the story. The passage should end just before a critical choice. Do not specify choices. Write in the present tense."},
    {role: "user", content: currentText + " " + this.innerHTML}, //need to include some summarization/selection of rpevious turns to give context to the story
  ];
	openAIFetchAPI(passagePrompt, 1).then(newText => {
  	let nextPassage = newText[0].message.content + "."
  	document.getElementById('adventureText').innerHTML = nextPassage;
    let choicesPrompt = [
      {role: "system", content: "You are writing a choose your own adventure book. Given the passage, give the player's next options as concrete actions, such as going walking to the left. Refer the the reader as `You` and use the present active tense. Do not prefix options with numbers. Do not use the word `can`"}, //maybe ask for different kinds of options here - as medidated by TSL?
      {role: "user", content: nextPassage},
    ];
    openAIFetchAPI(choicesPrompt, 2).then(userChoices => {
      document.getElementById('choice1').innerHTML = userChoices[0].message.content + ".";
      document.getElementById('choice2').innerHTML = userChoices[1].message.content + ".";
    })
  });
}

async function openAIFetchAPI(promptMessages, numChoices) {
    console.log("Calling GPT3")
    const url = "https://api.openai.com/v1/chat/completions";
    const YOUR_TOKEN = "sk-6r..." //add your own openai api key
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
            "stop": ["\n", "."]
        })
    }).then(response => {
        return response.json()
    });
    return data['choices'];
}
