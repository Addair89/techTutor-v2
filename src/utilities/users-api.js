import sendRequest from "./send-request";
const BASE_URL =
  "https://tech-tutor-v2-crivys065-jareds-projects-a42592e1.vercel.app/api/users";

export async function signUp(userData) {
  return sendRequest(`${BASE_URL}/`, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export async function getUserQuizData(userId) {
  try {
    const response = await sendRequest(
      `${BASE_URL}/quiz-data?userId=${userId}`,
      "GET"
    );
    return response;
  } catch (error) {
    console.log("Error getting user quiz data", error);
  }
}
export async function getUserScoreData(userId) {
  try {
    const response = await sendRequest(
      `${BASE_URL}/score-data?userId=${userId}`,
      "GET"
    );
    return response;
  } catch (error) {
    console.log("Error getting user quiz data", error);
  }
}

export async function getUserRank(userId) {
  try {
    const response = await sendRequest(
      `${BASE_URL}/user-rank?userId=${userId}`,
      "GET"
    );
    return response;
  } catch (error) {
    console.log("Error getting user quiz data", error);
  }
}
