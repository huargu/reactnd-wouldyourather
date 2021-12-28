import {
  GET_QUESTIONS,
  SUBMIT_ANSWER,
  SUBMIT_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SUBMIT_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser),
          },
        },
      };
    case SUBMIT_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}