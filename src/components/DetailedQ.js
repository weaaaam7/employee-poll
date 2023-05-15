import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleAnswer } from "../actions/questions";
import { handleSaveQuestionAnswer } from "../actions/users";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

const DetailedQ = ({ userAuth, questions, users, dispatch }) => {
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();
  const questionId = useParams().question_id;
  const question = questions[questionId];
  const loggedIn = users[userAuth];
  const userAuthAnswers = loggedIn.answers;
  const optionOneVotes = question?.optionOne.votes.length;
  const optionTwoVotes = question?.optionTwo.votes.length;
  const votesTotal = optionOneVotes + optionTwoVotes;
  const optionSelectedByUser = users[userAuth].answers[question?.id];

  const calculatePercentage = (votes, total) => {
    return Math.floor((votes / total) * 100);
  };

  const percentageOptionOne = calculatePercentage(optionOneVotes, votesTotal);
  const percentageOptionTwo = calculatePercentage(optionTwoVotes, votesTotal);

  useEffect(() => {
    const loggedInAnswer = Object.keys(userAuthAnswers)
      .filter((answer) => {
        return answer === questionId;
      })
      .map((answer) => {
        return userAuthAnswers[answer];
      });
    if (loggedInAnswer.length > 0) {
      setAnswered(true);
    }
  }, [userAuth, userAuthAnswers, questionId]);

  useEffect(() => {
    if (question === undefined) {
      navigate("/404");
    }
  }, [navigate, question]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      handleAnswer({
        userAuth,
        qid: questionId,
        answer: e.target.name,
      })
    );
    dispatch(
      handleSaveQuestionAnswer({
        userAuth,
        qid: questionId,
        answer: e.target.name,
      })
    );
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  const questionDetails = (
    <div>
      <Card>
        <Card.Body>
          <div className="text-center">
            <Card.Title>Poll by {question?.author}</Card.Title>
            <Card.Text>Would you rather</Card.Text>
            {!answered && (
              <div>
                <p><b>{question?.optionOne.text}</b></p>
                <div >
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    name="optionOne"
                    onClick={handleClick}
                  >
                    Vote
                  </Button>
                </div>
                <p></p>
                <p><b>{question?.optionTwo.text}</b></p>
                <div>
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    name="optionTwo"
                    onClick={handleClick}
                  >
                    Vote
                  </Button>
                </div>
              </div>
            )}
            {answered && (
              <div>
                <div>
                  {optionSelectedByUser === "optionOne" && (
                    <span>You voted for: </span>
                  )}
                  <p><b>{question?.optionOne.text}</b></p>
                  <ProgressBar
                    now={percentageOptionOne}
                    label={`${percentageOptionOne}%`}
                  />
                  <p>People who voted: {optionOneVotes}</p>
                </div>
                <p></p>
                <div>
                  {optionSelectedByUser === "optionTwo" && (
                    <span>You voted for: </span>
                  )}
                  <p><b>{question?.optionTwo.text}</b></p>
                  <ProgressBar
                    now={percentageOptionOne}
                    label={`${percentageOptionTwo}%`}
                  />
                  <p>People who voted:{optionTwoVotes}</p>
                </div>
                <Button onClick={handleBack}>Home</Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  return questionDetails;
};

const mapStateToProps = ({ userAuth, questions, users }) => ({
  users,
  userAuth,
  questions,
});

export default connect(mapStateToProps)(DetailedQ);
