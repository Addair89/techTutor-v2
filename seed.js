// testFetchQuestions.js
const fetchQuestions = require("./src/utilities/questionsAI-api");

async function test() {
  const category = "React"; // Replace with your test category
  const difficulty = "Easy"; // Replace with your test difficulty

  try {
    const response = await fetchQuestions(category, difficulty);
    console.log("Raw Response:", response.choices[0]);

    // Access the message object
    const messageObject = response.choices[0].message;

    // If the message object contains a JSON string in the 'content' field
    if (typeof messageObject.content === "string") {
      const parsedQuestions = JSON.parse(messageObject.content);
      console.log("Parsed Questions:", parsedQuestions);
    } else {
      // If the message object itself needs to be formatted as JSON
      console.log("Formatted Questions:", messageObject);
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

test();
