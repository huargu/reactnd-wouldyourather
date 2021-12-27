import React, { Component } from "react";
import { Form, Row, Col, Button, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { setAuthedUser as setAuthedUserAction } from "../actions/authedUser";

class Login extends Component {
  state = {
    selectedUser: "",
    loginDisabled: true,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setAuthedUserAction(this.state.selectedUser);
  };

  handleChange = (e) => {
    this.setState({
      selectedUser: e.target.value,
      loginDisabled: false,
    });
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-div">
          <h2 className="login-h2">Welcome to Would You Rather?</h2>
          <Form.Select
            className="login-input mt-3"
            onChange={this.handleChange}
          >
            <option>Select user...</option>
            {this.props.users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Select>
          <Button
            className="login-btn"
            bsStyle="primary"
            bsSize="large"
            onClick={this.handleSubmit}
            block
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
    setAutherUser: setAuthedUserAction,
  };
}

export default connect(mapStateToProps, { setAuthedUserAction })(Login);