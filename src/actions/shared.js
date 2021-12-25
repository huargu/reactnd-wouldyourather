import { getInitialData } from "../util/api";
import { getUsers } from "./users";
import { getQuestions } from "./questions";
import { setAuthenticatedUser } from "./authenticatedUser";

const tempUserId = 'tylermcginnis'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
      dispatch(setAuthenticatedUser(tempUserId))
    });
  };
}