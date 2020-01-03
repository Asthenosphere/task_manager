import React from "react";
import { Link } from "react-router-dom";
import Registration from "./authentication/Registration";

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuthentication = this.handleSuccessfulAuthentication.bind(this);
  }

  handleSuccessfulAuthentication(data) {
    this.props.handleLogin(data);
    this.props.history.push("/tasks")
  }

  render() {
    return (
      <div>
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
          <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
              <h1 className="center display-4">Welcome to To-do List</h1>
              <p className="center">
                An elegant, simple yet powerful way to manage your tasks
              </p>

              <hr className="center" />
              <div className="center">
                <Link
                  to="/tasks"
                  className="ui basic teal button"
                  role="button"
                >
                  View Tasks
                </Link>
                <Registration handleSuccessfulAuthentication={this.handleSuccessfulAuthentication}/>
                <p>Status: {this.props.loggedInStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};