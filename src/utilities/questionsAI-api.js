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
          content: `Generate 10 ${difficulty}-level question about ${category} syntax. True or false only and give me the answer as well. Respond in JSON Format`,
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
