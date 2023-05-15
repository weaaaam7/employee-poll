import { receiveUsers, addAnswerToUser } from "./users";
import { receiveQuestions, handleAnswer } from "./questions";
import { getInitialData, saveQuestionAnswer } from "../utils/api";

export const handleSaveAnswer = (answer) => {
  return (dispatch) => {
    saveQuestionAnswer(answer)
      .then(() => {
        dispatch(handleAnswer(answer));
        dispatch(addAnswerToUser(answer));
      })
      .catch((e) => {
        console.warn("Error in handleSaveAnswer: ", e);
      });
  };
};

export const handleInitialData = () => {
  return async (dispatch) => {
    const { users, questions } = await getInitialData();
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
  };
};
