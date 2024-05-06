import sendRequest from "./send-request";
const BASE_URL = "/api/flash-card";

export async function addFlashCard(question, user) {
  console.log(question);
  try {
    const url = `${BASE_URL}/add`;
    const method = "POST";
    const payload = {
      user,
      question,
    };
    const response = await sendRequest(url, method, payload);
    console.log("RESPONSE FORM FLASHCARD ADD", response);
    return question;
  } catch (error) {
    console.error("Error adding Flash Card:", error.message);
    throw error;
  }
}

export async function getFlashCards(userId) {
  console.log(userId);
  try {
    const url = `${BASE_URL}/get/${userId}`;

    const response = await sendRequest(url);
    return response;
  } catch (error) {}
}

export async function removeFlashCard(question, user) {
  try {
    const url = `${BASE_URL}/delete/${question._id}/${user._id}`;
    const method = "DELETE";
    const response = await sendRequest(url, method);
    return question._id;
  } catch (error) {}
}

export async function addUserDefinedCard(question, answer, user) {
  const payload = {
    question,
    answer,
    user,
  };
  try {
    const response = await sendRequest(
      `${BASE_URL}/add-user-card`,
      "POST",
      payload
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
