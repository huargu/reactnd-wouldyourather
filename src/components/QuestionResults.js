import { ProgressBar, Row, Col } from "react-bootstrap";
import React from "react";

function QuestionResults({ authedUser, question }) {
  const totalVote =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercent =
    totalVote === 0 ? 0 : 100 * (question.optionOne.votes.length / totalVote);
  const optionTwoPercent =
    totalVote === 0 ? 0 : 100 * (question.optionTwo.votes.length / totalVote);

  console.log(optionOnePercent);

  return (
    <div>
      <Row className="Row m-row justify-content-left align-items-center">
        <Col md={3}>
          <div>{question.optionOne.text}</div>
        </Col>
        <Col md={5} className="text-align-center">
          <ProgressBar now={optionOnePercent} label={`${optionOnePercent}%`} />
        </Col>
        {question.optionOne.votes.some((vote) => vote === authedUser) ? (
          <Col md={3}>
            <div>Your answer</div>
          </Col>
        ) : null}
      </Row>
      <Row className="Row m-row justify-content-left align-items-center">
        <Col md={3}>
          <div>{question.optionTwo.text}</div>
        </Col>
        <Col md={5}>
          <ProgressBar now={optionTwoPercent} label={`${optionTwoPercent}%`} />
        </Col>
        {question.optionTwo.votes.some((vote) => vote === authedUser) ? (
          <Col md={3}>
            <div className="fst-italic">This is your answer</div>
          </Col>
        ) : null}
      </Row>
    </div>
  );
}

export default QuestionResults;