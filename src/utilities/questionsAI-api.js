require("dotenv").config();
const OpenAI = require("openai");
const apiKey = process.env.API_KEY;
const client = new OpenAI({ apiKey: apiKey });
async function fetchQuestions(category, difficulty) {
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Generate 1 ${difficulty}-level question about ${category}. Respond in JSON Format i need fields for the question, answer, options, hint, explanation.`,
        },
      ],
      model: "gpt-4",
    });
    return response;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
}

module.exports = fetchQuestions;
