import { useState } from "react";
import { connect } from "react-redux";
import DBCard from "./DBCard";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


const mapStateToProps = ({ userAuth, questions, users }) => {
  const questionsAnsweredIds = Object.keys(users[userAuth].answers);
  const questionsAnswered = Object.values(questions)
    .filter((question) => questionsAnsweredIds.includes(question.id));
  const questionsUnanswered = Object.values(questions)
    .filter((question) => !questionsAnsweredIds.includes(question.id));

  return {
    allQuestions: {
      questionsAnswered,
      questionsUnanswered,
    },
  };
};


const DB = ({ allQuestions }) => {
  const [key, setKey] = useState("unanswered");
  const tabs = ( <>
    <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
      id="controlled-tab"
    >
      <Tab eventKey="unanswered" title="Unanswered polls">
        {allQuestions.questionsUnanswered.map((question) => (
          <DBCard key={question.id} question={question} />
        ))}
      </Tab>
      <Tab eventKey="answered" title="Answered polls">
        {allQuestions.questionsAnswered.map((question) => (
          <DBCard key={question.id} question={question} />
        ))}
      </Tab>
    </Tabs>
  </> );

  return tabs;
  
};

export default connect(mapStateToProps)(DB);
