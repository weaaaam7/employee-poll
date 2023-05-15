import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewPoll from "../NewPoll";
import { handleAddQuestion } from "../../actions/questions";

jest.mock("../../actions/questions", () => ({
  handleAddQuestion: jest.fn(),
}));

describe("NewPoll", () => {
  afterEach(cleanup);
  it("add a new question on submit", () => {
    const store = createStore((state = { userAuth: "user" }) => state);
    jest.spyOn(store, "dispatch").mockImplementation(() => {});

    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewPoll />
        </MemoryRouter>
      </Provider>
    );
    const submitBtn = getByText("Submit");

    const expectedQuestion = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "user",
    };

    const optionOneInput = getByLabelText("First Option");
    const optionTwoInput = getByLabelText("Second Option");
    fireEvent.change(optionOneInput, { target: { value: "Option One" } });
    fireEvent.change(optionTwoInput, { target: { value: "Option Two" } });

    fireEvent.click(submitBtn);

    expect(handleAddQuestion.mock.calls.length).toBe(1);
    expect(handleAddQuestion.mock.calls[0][0]).toEqual(expectedQuestion);
  });
});
