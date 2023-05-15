import { _saveQuestion, _saveQuestionAnswer, _getQuestions } from "../_DATA";

describe("Save question", () => {
  it("question if successful", async () => {
    const question = {
      optionOneText: "JavaScript",
      optionTwoText: "TypeScript",
      author: "Sarah Edo",
    };
    const result = await _saveQuestion(question);
    expect(result.optionOne).toBeDefined();
    expect(result.optionTwo).toBeDefined();
    expect(result.author).toBeDefined();
  });

  it("error if unsuccessful", async () => {
    const invalidQuestion = {
      optionOneText: "",
      optionTwoText: "",
      author: "",
    };
    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please enter optionOneText, optionTwoText, and author"
    );
  });

  it("error if a field is missing", async () => {
    const invalidQuestion = {
      optionTwoText: "",
      author: "",
    };
    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please enter optionOneText, optionTwoText, and author"
    );
  });
});

describe("save answer", () => {
  it("should return an answer if successful", async () => {
    const answer = {
      userAuth: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };
    const result = await _saveQuestionAnswer(answer);
    expect(result).toBeTruthy();
  });

  it("error if unsuccessful", async () => {
    const invalidAnswer = {
      userAuth: "",
      qid: "",
      answer: "",
    };
    await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
      "Please enter userAuth, qid, and answer"
    );
  });

  it("error if a field is missing", async () => {
    const invalidAnswer = {
      userAuth: "",
      qid: "",
    };
    await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
      "Please enter userAuth, qid, and answer"
    );
  });
});
