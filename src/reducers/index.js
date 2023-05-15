import { combineReducers } from "redux";
import userAuth from "./userAuth";
import users from "./users";
import questions from "./questions";

export default combineReducers({
  userAuth,
  users,
  questions,
});
