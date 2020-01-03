import React from 'react';
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

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
      .then(response => this.props.history.push(`/task/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container"><br/>
        <div className="center ui huge header">Create a new task to remind yourself</div>

        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label htmlFor="taskTitle">Title</label>
            <input type="text" placeholder="Title of Task" name="title" id="taskTitle" autoFocus="autofocus" className="form-control" required onChange={this.onChange}/>
          </div>
          <div className="field">
            <label htmlFor="description">Description of Task</label>
            <textarea placeholder="Description of Task" className="form-control" id="description" name="description" rows="5" required onChange={this.onChange}/>
          </div>
          <button type="submit" className="ui basic blue button">
            Create Task
          </button>
          <Link to="/tasks" className="ui basic teal button">Back to Tasks</Link>
        </form>

      </div>
    )
  }
}

export default TaskNew