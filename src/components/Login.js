import React, { useState } from "react";
import { connect } from "react-redux";
import { setuserAuth } from "../actions/userAuth";
import Button from "react-bootstrap/Button";

const mapStateToProps = ({ users }) => {
  return {
    users: Object.keys(users).map((id) => users[id]),
  };
};

const Login = ({ users, dispatch }) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setuserAuth(selectedUser));
  };

  return (
    <div className="form-container">
      <form>
        <h1>Who do you want to impersonate?</h1>
        <div>
          {users.map((user) => {
            const { id, name } = user;

            return (
              <div className="select-user" key={id}>
                <label>{name}</label>
                <input
                  type="radio"
                  name="user"
                  value={user.id}
                  onChange={(e) => setSelectedUser(e.target.value)}
                />
              </div>
            );
          })}
        </div>
        <Button type="submit" onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps)(Login);
