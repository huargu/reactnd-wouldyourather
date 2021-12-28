import { getInitialData } from "../util/api";
import { getUsers } from "./users";
import { getQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading";
import { setAuthedUser } from "./authedUser";

const INITIAL_AUTH_ID = "";
export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
      dispatch(setAuthedUser(INITIAL_AUTH_ID));
      dispatch(hideLoading());
    });
  };
}