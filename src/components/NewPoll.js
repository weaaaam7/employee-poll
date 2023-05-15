import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const mapStateToProps = ({ userAuth }) => {
  return {
    userAuth,
  };
};

const NewPoll = ({ userAuth, dispatch }) => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const navigate = useNavigate();

  const question = {
    optionOneText,
    optionTwoText,
    author: userAuth,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(question));
    setOptionOneText("");
    setOptionTwoText("");
    navigate("/");
  };

  const form = (
    <Form className="new-poll" onSubmit={handleSubmit}>
      <h1 className="text-center">Create Your Own Poll</h1>

      <Form.Group controlId="firstOption">
        <Form.Label>First Option</Form.Label>
        <Form.Control
          placeholder="Option One"
          type="text"
          name="option1"
          onChange={(e) => setOptionOneText(e.target.value)}
          value={optionOneText}
        />
      </Form.Group>
      <Form.Group controlId="secondOption">
        <Form.Label>Second Option</Form.Label>
        <Form.Control
          placeholder="Option Two"
          type="text"
          name="option1"
          onChange={(e) => setOptionTwoText(e.target.value)}
          value={optionTwoText}
        />
      </Form.Group>
      <div><p></p></div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );

  return form;
};

export default connect(mapStateToProps)(NewPoll);
