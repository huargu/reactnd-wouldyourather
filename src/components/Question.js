import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { formatQuestion } from "../util/helper";
import QuestionAnswers from "./QuestionAnswers";
import QuestionResults from "./QuestionResults";
import { withRouter, Link, Redirect } from "react-router-dom";

class Question extends Component {
  render() {
    const { authedUser, question, isDashboard, isAnswered } = this.props;

    if (!question) {
      return !authedUser ? <Redirect to='/' /> : <Redirect to='/404'/>
    }

    const alreadyAnswered =
      question.optionOne.votes.some((vote) => vote === authedUser) ||
      question.optionTwo.votes.some((vote) => vote === authedUser);

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
          {isAnswered ? 
          <Link
            className="btn btn-success mt-auto align-self-start"
            to={`/questions/${question.id}`}
          >
            Results
          </Link>
          :
          <Link
            className="btn btn-primary mt-auto align-self-start"
            to={`/questions/${question.id}`}
          >
            Answer
          </Link>
          }
        </Card.Body>
      </Card>
    ) : (
      <div>
        <Card className="mt-4" style={{ width: "50rem" }}>
          <Card.Header>Would you rather?</Card.Header>
          {alreadyAnswered ? (
            <QuestionResults authedUser={authedUser} question={question} />
          ) : (
            <QuestionAnswers id={question.id} />
          )}
          <Card.Footer>Asked by {question.authorName}</Card.Footer>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(
  { authedUser, users, questions },
  { id, isDashboard, isAnswered }
) {
  const question = questions[id];

  return {
    authedUser,
    question: !question ? null : formatQuestion(question, users[question.author]),
    isDashboard,
    isAnswered
  };
}

export default withRouter(connect(mapStateToProps)(Question));