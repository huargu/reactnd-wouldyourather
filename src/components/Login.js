import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setAuthedUser as setAuthedUserAction } from "../actions/authedUser";

class Login extends Component {
  state = {
    selectedUser: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setAuthedUserAction(this.state.selectedUser);
  };

  handleChange = (e) => {
    this.setState({
      selectedUser: e.target.value,
    });
  };

  render() {
    return (
      <div className="form-container">
        <div className="form-div">
          <h2 className="form-h2">Welcome to Would You Rather?</h2>
          <Form.Select className="form-input mt-3" onChange={this.handleChange}>
            <option>Select user...</option>
            {this.props.users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Select>
          <Button
            className="form-btn primary large"
            onClick={this.handleSubmit}
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