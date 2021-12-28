import { getInitialData } from "../util/api";
import { getUsers } from "./users";
import { getQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";

const INITIAL_AUTH_ID = "";
export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
      dispatch(setAuthedUser(INITIAL_AUTH_ID));
    });
  };
}