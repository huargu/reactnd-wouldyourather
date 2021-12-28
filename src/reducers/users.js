import { GET_USERS, ADD_ANSWER, ADD_QUESTION } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    case ADD_QUESTION:
      const { author, id } = action;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id]),
        },
      };
    default:
      return state;
  }
}