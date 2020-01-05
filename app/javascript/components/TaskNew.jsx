import React from 'react';
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import Footer from "./Footer";
import city from "./city.jpeg";

class TaskNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      status: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/tasks/create";
    const { title, description, status } = this.state;
    if (title.length === 0 || description.length === 0)
      return;

    const body = {
      title,
      description,
      status
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        this.props.history.push(`/task/${response.id}/edit`);
        this.props.history.push(`/task/${response.id}`);
      })
      .catch(error => {
        window.alert("Task title duplicated, please try another one.");
        console.log(error.message);
      });
  }

  render() {
    return (
      <div>
        <div className="ui inverted menu">
          <Link to="/tasks" className="item">Tasks</Link>
          <Link to="/new_task" className="active item">
            New Task
          </Link>
          <Link to="/categories" className="item">Categories</Link>
          <a className="item">New Category</a>
          {this.props.admin ?
            <Link to="/users" className="item">Users</Link>
            :
            undefined
          }
          <div className="right menu">
            <Link to="/" className="item">
              Home
            </Link>
          </div>
        </div>
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"800"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">New Task</h1>
            <h4>Create a new task to remind yourself</h4>
          </div>
        </section>
        <div className="ui grid">
          <div className="ui five wide column"/>
          <div className="ui six wide column">
            <div className="ui center aligned segment">
              <form className="ui form" onSubmit={this.onSubmit}>
                <br/>
                <h5>Title</h5>
                <div className="field">
                  <label htmlFor="taskTitle"/>
                  <input type="text" placeholder="Title of Task" name="title" id="taskTitle" autoFocus="autofocus" className="form-control" required onChange={this.onChange}/>
                </div>
                <h5>Description</h5>
                <div className="field">
                  <label htmlFor="description"/>
                  <textarea placeholder="Description of Task" className="form-control" id="description" name="description" rows="5" required onChange={this.onChange}/>
                </div><br/>
                <button type="submit" className="ui basic blue button">
                  Create Task
                </button>
                <Link to="/tasks" className="ui basic teal button">Back to Tasks</Link><br/>
              </form><br/>
            </div>
          </div>
        </div><br/><br/><br/>
        <Footer /><br/>
      </div>
    )
  }
}

export default TaskNew