import { saveQuestionAnswer } from "../util/api";
import { addAnswer as addUserAnswer } from "./users";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const SUBMIT_ANSWER = "SUBMIT_ANSWER";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function submitAnswer(authedUser, qid, answer) {
  return {
    type: SUBMIT_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion({ qid, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(submitAnswer(authedUser, qid, answer));
    dispatch(addUserAnswer(authedUser, qid, answer));
    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {})
      .catch((e) => {
        console.warn("Error in handleSaveQuestionAnswer:", e);
      });
  };
}