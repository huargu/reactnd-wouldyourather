import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Question List</h3>
        <ul>
          {this.props.questionIds.map((id) => (
            <li key={id}>QuestionId: {id}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);