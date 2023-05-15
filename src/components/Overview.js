import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

const mapStateToProps = ({ users }) => {
  const OverviewUsers = Object.values(users)
    .map((user) => {
      const { id, name } = user;
      const answers = Object.values(user.answers).length;
      const questions = user.questions.length;
      const total = answers + questions;
      return { id, name, answers, questions, total };
    })
    .sort((a, b) => b.total - a.total);
  return { OverviewUsers };
};

const Overview = ({ OverviewUsers }) => {

  const table = (
    <Table responsive bordered hover>
      <thead>
        <tr>
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {OverviewUsers.map((user) => {
          const { name, answers, questions } = user;
          return (
            <tr key={name}>
              <td>
                {name}
              </td>
              <td>{answers}</td>
              <td>{questions}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return table;
};

export default connect(mapStateToProps)(Overview);
