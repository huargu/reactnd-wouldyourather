import React, { Component } from "react";
import { connect } from "react-redux";
import { GridSystem } from "./Grid";
import Question from "./Question";
import { Tabs, Tab } from "react-bootstrap";

class Dashboard extends Component {
  state = {
    tabActiveKey: 'unanswered',
  };

  setKey = (key) => {
    this.setState({
      tabActiveKey: key
    });
  }

  render() {
    return (
      <div className="center">
        <Tabs className="mb-3 mt-3" onSelect={(k) => this.setKey(k)} activeKey={this.state.tabActiveKey}>
          <Tab eventKey="unanswered" title="Unanswered Questions">
            <GridSystem colCount={5} md={2}>
              {this.props.unanswered.map((id) => (
                <Question key={id} id={id} isDashboard={true} isAnswered={false} />
              ))}
            </GridSystem>
          </Tab>
          <Tab eventKey="answered" title="Answered Questions">
            <GridSystem colCount={5} md={2}>
              {this.props.answered.map((id) => (
                <Question key={id} id={id} isDashboard={true} isAnswered={true}/>
              ))}
            </GridSystem>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const useranswers = Object.keys(users[authedUser].answers)

  const answered = Object.values(questions)
    .filter((question) => useranswers.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((question) => { return question.id })

  const unanswered = Object.values(questions)
    .filter((question) => !answered.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((question) => { return question.id })

  return {
    answered,
    unanswered,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
