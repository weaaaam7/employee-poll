import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { setuserAuth } from "../actions/userAuth";

const mapStateToProps = ({ users, userAuth }) => {
  const { name } = users[userAuth];

  return {
    name
  };
};

const PollNav = ({ name, dispatch }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setuserAuth(null));
    navigate("/");
  };

  const navigationBar = ( 
  
    <Nav className="PollNav" defaultActiveKey="/" as="ul">

      <div className="PollNav-username">
        <span><b>{name}</b></span>
      </div>

      <Nav.Item>
        <Link to="/" className="PollNav-link">
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/Overview" className="PollNav-link">
          Overview
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/New" className="PollNav-link">
          New Question
        </Link>
      </Nav.Item>

      <div className="PollNav-right">
        <button className="PollNav-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Nav>
  );

  return navigationBar;
};

export default connect(mapStateToProps)(PollNav);
