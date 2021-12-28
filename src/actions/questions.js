import { saveQuestionAnswer, saveQuestion } from "../util/api";
import {
  addAnswer as addUserAnswer,
  addQuestion as addUserQuestion,
} from "./users";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const SUBMIT_ANSWER = "SUBMIT_ANSWER";
export const SUBMIT_QUESTION = "SUBMIT_QUESTION";

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

export function submitQuestion(question) {
  return {
    type: SUBMIT_QUESTION,
    question,
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

export function handleAddQuestion(optionOneText, optionTwoText, authedUser) {
  return (dispatch) => {
    const question = {
      author: authedUser,
      optionOneText,
      optionTwoText,
    };

    return saveQuestion(question)
      .then((resQuestion) => {
        dispatch(submitQuestion(resQuestion));
        dispatch(addUserQuestion(resQuestion));
      })
      .catch((e) => {
        console.warn("Error in handleAddQuestion:", e);
      });
  };
}