const numPassagesToConsider = 3;

let genericPrompt = "You are writing a choose your own adventure book. Compose a one paragraph-long passage of the story of at most 200 words. The paragraph should end just before a critical choice. Do not specify choices. Write in the present tense and never use the first-person."

async function obstacle(summary, choice, obstacle) {
  console.log("getting " + obstacle + " passage...");
  let specificPrompt = " Compose a passage where the reader encounters a " + obstacle + " on their journey.";
  let passagePrompt = [
    { role: "system", content: genericPrompt + specificPrompt },
    { role: "assistant", content: summary + " " + passage },
    { role: "user", content: choice },
  ];
  return await getAPIResponse(passagePrompt, false);
}

//TSL predicates
async function checkObstacle(obstacle) {
  console.log("checking if in " + obstacle + "...");
  if (!passage || passage.trim() === "") {
    console.log("No passage to check");
    return false;
  }
  
  let passagePrompt = [
    { role: "system", content: `Read this passage. Is the character currently INSIDE or physically AT a ${obstacle}? Look for phrases like "in the ${obstacle}", "inside the ${obstacle}", "at the ${obstacle}", "entered the ${obstacle}", "within the ${obstacle}". Answer '1' ONLY if they are physically there right now. Answer '0' if they are traveling to it, near it, or it's just mentioned. Your response must end with either '1' or '0'.` },
    { role: "user", content: passage },
  ];
  const result = await getAPIResponse(passagePrompt, true);
  console.log(`[Predicate] ${obstacle}: ${result}`);
  return result;
}

async function updateSummary(previousSummary) {
  passages.push(previousSummary);
  let summaryPrompt = [
    { role: "system", content: "You are writing a book and need to recall important points of the story so far. Summarize the provided passage from about the story so far in moderate detail, including the main character description, the locations visited, items  acquired, and interactions with other characters." }, //maybe ask for different kinds of options here - as mediated by TSL?
    { role: "user", content: passages.slice(-numPassagesToConsider).join(' ') },
  ];
  return await getAPIResponse(summaryPrompt, false);
}

async function getAPIResponse(prompt, isPredicate) {
  try {
    let [text] = await apiClient.makeRequest(prompt, { stopSequences: ["\n"] });
    if (isPredicate) {
      console.log("predicate raw:", text);
      return text.includes('1') || /true/i.test(text);
    }
    return text;
  } catch (err) {
    console.error("LLM call failed:", err);
    return null;
  }
}
