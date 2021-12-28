import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import QuestionPage from "./QuestionPage";
import QuestionNew from "./QuestionNew";
import Login from "./Login";
import Leaderboard from "./Leaderboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  ifAuthedUserNotExists = (authedUser) => {
    return authedUser === null || authedUser === "" || authedUser === undefined;
  };

  render() {
    const { authedUser } = this.props;

    return (
      <BrowserRouter>
        <Fragment>
          <div className="container">
            {this.ifAuthedUserNotExists(authedUser) ? (
              <Login />
            ) : (
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/questions/:id" component={QuestionPage} />
                <Route path="/add" component={QuestionNew} />
                <Route path="/leaderboard" component={Leaderboard} />
              </Switch>
            )}
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);