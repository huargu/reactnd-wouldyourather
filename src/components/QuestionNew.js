import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Link } from "react-router-dom"

class QuestionNew extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };
  handleSubmit = () => {
    const { dispatch, authedUser } = this.props;
    dispatch(
      handleAddQuestion(this.state.optionOne, this.state.optionTwo, authedUser)
    );
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="form-container">
        <div className="form-div">
          <h2 className="form-h2">New Question</h2>
          <Form.Label className="mt-2">Option one</Form.Label>
          <Form.Control
            type="text"
            value={this.state.optionOne}
            name="optionOne"
            onChange={this.handleChange}
            placeholder="would you rather?"
          />
          <Form.Label className="mt-2">Option two</Form.Label>
          <Form.Control
            type="text"
            value={this.state.optionTwo}
            name="optionTwo"
            onChange={this.handleChange}
            placeholder="or?"
          />
          <Button
            className="form-btn primary large"
            as={Link}
            to="/"
            onClick={this.handleSubmit}
            disabled={
              this.state.optionOne === "" || this.state.optionTwo === ""
            }
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(QuestionNew);