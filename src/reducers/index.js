import { combineReducers } from "redux";
import users from "./users";
import questions from "./questions";
import authenticatedUser from "./authenticatedUser";

export default combineReducers({
  authenticatedUser,
  users,
  questions,
});