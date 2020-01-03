import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Root from "../components/Root";
import Tasks from "../components/Tasks";
import Task from "../components/Task";
import TaskNew from "../components/TaskNew";
import TaskEdit from "../components/TaskEdit";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact path="/"
              render={props => (
                <Root
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact path="/tasks"
              render={props => (
                <Tasks
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route path="/task/:id" exact component={Task} />
            <Route path="/new_task" exact component={TaskNew} />
            <Route path="/task/:id/edit" exact component={TaskEdit} />
          </Switch>
        </Router>
      </div>
    )
  }
}

