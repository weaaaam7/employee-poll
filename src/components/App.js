import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import DB from "./DB";
import NewPoll from "./NewPoll";
import Overview from "./Overview";
import PollNav from "./PollNav";
import Login from "./Login";
import DetailedQ from "./DetailedQ";
import Error from "./Error";

const App = ({ userAuth, dispatch }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);
  return (
    <>
      {userAuth !== null ? (
        <>
          <PollNav />
          <Routes>
            <Route exact path="/" element={<DB />} />
            <Route path="/Overview" element={<Overview />} />
            <Route path="/New" element={<NewPoll />} />
            <Route path="/questions/:question_id" element={<DetailedQ />} />
            <Route path="/404" exact element={<Error />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

const mapStateToProps = ({ userAuth }) => ({
  userAuth,
});

export default connect(mapStateToProps)(App);
