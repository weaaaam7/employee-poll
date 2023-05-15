import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./reducers/userAuth";
import users from "./reducers/users";
import questions from "./reducers/questions";

export const store = configureStore({
  reducer: {
    userAuth,
    users,
    questions,
  },
});
