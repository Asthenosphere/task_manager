import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Root from "../components/Root";
import Tasks from "../components/Tasks";
import Task from "../components/Task";
import TaskNew from "../components/TaskNew";
import TaskEdit from "../components/TaskEdit";
import Users from "../components/Users";
import User from "../components/User"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Root} />
      <Route path="/tasks" exact component={Tasks} />
      <Route path="/task/:id" exact component={Task} />
      <Route path="/new_task" exact component={TaskNew} />
      <Route path="/task/:id/edit" exact component={TaskEdit} />
      <Route path="/users" exact component={Users} />
      <Route path="/user/:id" exact component={User} />
    </Switch>
  </Router>
);