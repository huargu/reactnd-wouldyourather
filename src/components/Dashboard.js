import React, { Component } from "react";
import { connect } from "react-redux";
import { GridSystem } from "./Grid";
import Question from "./Question";

class Dashboard extends Component {
  render() {
    return (
      <div className="center">
        <h3>Question List</h3>
        <GridSystem colCount={5} md={2}>
          {this.props.questionIds.map((id) => (
            <Question key={id} id={id} isDashboard={true} />
          ))}
        </GridSystem>
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