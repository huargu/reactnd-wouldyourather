import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

class Leaderboard extends Component {
  render() {
    console.log(this.props.users);
    const stats = this.props.users
      .map((user) => ({
        id: user.id,
        name: user.name,
        avatar: user.avatarURL,
        answers: user.answers !== null ? Object.values(user.answers).length : 0,
        questions:
          user.questions !== null ? Object.values(user.questions).length : 0,
        total:
          (user.answers !== null ? Object.values(user.answers).length : 0) +
          (user.questions !== null ? Object.values(user.questions).length : 0),
      }))
      .sort((a, b) => a.total - b.total)
      .reverse();

    console.log(stats);
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-div">
          <Table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Total Points</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Answered Questions</th>
                <th style={{ textAlign: "center" }}>Submitted Questions</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat.id}>
                  <td>{stat.total}</td>
                  <td style={{ textAlign: "left" }}>
                    <span>
                      <img
                        src={stat.avatar}
                        alt={stat.name}
                        style={{ maxWidth: "50px", marginRight: "10px" }}
                      />
                    </span>
                    {stat.name}
                  </td>
                  <td>{stat.answers}</td>
                  <td>{stat.questions}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default connect(mapStateToProps)(Leaderboard);