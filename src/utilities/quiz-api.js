import sendRequest from "./send-request";
const BASE_URL = "/api/quiz";

export async function saveQuiz(
  user,
  questions,
  count,
  difficulty,
  category,
  answers
) {
  console.log(user, questions, count, difficulty, category, answers);
  try {
    const url = `${BASE_URL}/save`;
    const method = "POST";
    const payload = {
      user,
      questions,
      count,
      difficulty,
      category,
      answers,
    };

    const response = await sendRequest(url, method, payload);
    console.log("RESPONSE FORM QUIZ SEND REST", response);
  } catch (error) {
    console.error("Error saving quiz:", error);
  }
}
