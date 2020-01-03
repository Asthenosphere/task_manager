import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Welcome to To-do List</h1>
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
          </div>
        </div>
      </div>
    </div>
  </div>
);