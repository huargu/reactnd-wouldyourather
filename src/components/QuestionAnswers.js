import React, { Component } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { formatQuestion } from "../util/helper";
import { handleAnswerQuestion } from "../actions/questions";

class QuestionAnswers extends Component {
  state = {
    selectedOption: "",
  };

  handleChange = (e) => {
    e.persist();
    const option = e.target.value;

    this.setState(() => ({
      selectedOption: option,
    }));
  };

  handleSubmit = () => {
    const { dispatch, question } = this.props;
    const answerVal = this.state.selectedOption;
    dispatch(
      handleAnswerQuestion({
        qid: question.id,
        answer: answerVal,
      })
    );
    this.setState(() => ({
      selectedOption: "",
    }));
  };

  render() {
    const { question } = this.props;

    return (
      <Form>
        <fieldset>
          <Form.Group
            as={Row}
            controlId={this.state.selectedOption}
            className="mb-3 mt-2"
          >
            <Col sm={10} className="mt-2">
              <Form.Check
                value="optionOne"
                checked={this.state.selectedOption === "optionOne"}
                onChange={this.handleChange}
                type="radio"
                label={question.optionOne.text}
                name="answer1"
                id="1"
              />
              <Form.Check
                value="optionTwo"
                checked={this.state.selectedOption === "optionTwo"}
                onChange={this.handleChange}
                type="radio"
                label={question.optionTwo.text}
                name="answer2"
                id="2"
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 1, offset: 2 }}>
            <Button
              disabled={this.state.selectedOption === ""}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  return {
    authedUser,
    question: formatQuestion(question, users[question.author]),
  };
};

export default connect(mapStateToProps)(QuestionAnswers);