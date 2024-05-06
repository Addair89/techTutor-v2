import sendRequest from "./send-request";
const BASE_URL = "/api/questions";

export async function fetchCategories() {
  try {
    const categories = await sendRequest(`${BASE_URL}/all-categories`);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
}

export async function fetchDifficultiesByCategory(cat) {
  try {
    const difficulties = await sendRequest(
      `${BASE_URL}/cat-difficulties/${cat}`
    );
    return difficulties;
  } catch (error) {
    console.error("Error fetching difficulties:", error.message);
    throw error;
  }
}

export async function getQuestions(cat, diff) {
  try {
    const questions = await sendRequest(`${BASE_URL}/${cat}/${diff}`);
    return questions;
  } catch (error) {
    console.error("Error fetching difficulties:", error.message);
  }
}

export async function getQuestionAndAnswer(questionId) {
  try {
    const response = await sendRequest(`${BASE_URL}/detail/${questionId}`);
    console.log(`Response for question ID ${questionId}:`, response);
    return response;
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export function checkResults(questions, answers) {
  let count = 0;
  let wrongAnswers = [];
  questions.forEach((question, index) => {
    const correctAnswerIdx = question.answer;
    const selectedOptionIdx = answers[question._id].optionIdx + 1;
    const correctAnswer = correctAnswerIdx === selectedOptionIdx;
    if (correctAnswer) {
      count += 1;
    } else {
      wrongAnswers.push(question);
    }
  });
  return { count, wrongAnswers };
}
