import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { formatQuestion } from "../util/helper";

class Question extends Component {
  render() {
    const { question, isDashboard } = this.props;
    return isDashboard ? (
      <Card className="mt-4">
        <Card.Img src={question.authorAvatar}></Card.Img>
        <Card.Body className="d-flex flex-column">
          <Card.Title as="h6">{question.authorName} asks:</Card.Title>
          <Card.Subtitle as="h6" className="fw-lighter mb-2">
            {question.formattedDate}
          </Card.Subtitle>
          <Card.Text className="fst-italic text-muted">
            Would you rather{" "}
            <span className="text-reset">{question.optionOne.text} or?</span>
          </Card.Text>
          <Card.Link
            className="btn btn-primary mt-auto align-self-start"
            href="#"
          >
            Answer
          </Card.Link>
        </Card.Body>
      </Card>
    ) : (
      <div>Question Details</div>
    );
  }
}

function mapStateToProps(
  { authedUser, users, questions },
  { id, isDashboard }
) {
  const question = questions[id];
  return {
    authedUser,
    question: formatQuestion(question, users[question.author]),
    isDashboard,
  };
}

export default connect(mapStateToProps)(Question);