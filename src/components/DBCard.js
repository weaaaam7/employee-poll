import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const DBCard = ({ question }) => {
  const questionDate = new Date(question?.timestamp).toDateString();

  return (
    <div>
      <Card>
        <Card.Body>
          <div>
            <Card.Title>{question?.author}</Card.Title>
            <Card.Text> <p>{question?.optionOne.text} <b>VS</b> {question?.optionTwo.text}</p></Card.Text>
          </div>
          <Link to={`questions/${question?.id}`}>
            <div>
              <Button>
                View
              </Button>
            </div>
          </Link>

          <div>
            <p> {questionDate}</p>
          </div>

        </Card.Body>
      </Card>
    </div>
  );
};

export default DBCard;
