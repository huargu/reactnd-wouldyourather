import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import QuestionPage from "./QuestionPage";
import QuestionNew from "./QuestionNew";
import Login from "./Login";
import Leaderboard from "./Leaderboard";
import NavigationBar from "./NavigationBar";
import { NotFound } from "./NotFound";
import { resetAuthedUser } from "../actions/authedUser"

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  ifAuthedUserNotExists = (authedUser) => {
    return authedUser === null || authedUser === "" || authedUser === undefined;
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(resetAuthedUser())
  }

  render() {
    const { authedUser, users } = this.props;

    return (
      <BrowserRouter>
        <Fragment>
          {this.ifAuthedUserNotExists(authedUser) ? (
            <Login />
          ) : (
            <div>
              <NavigationBar authedUser={users[authedUser]} onLogoutClick={this.handleLogout} />
              <div className="container flex-column">
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/questions/:id" exact component={QuestionPage} />
                  <Route path="/add" exact component={QuestionNew} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/404" component={NotFound} />
                </Switch>
              </div>
            </div>
          )}
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(App);
