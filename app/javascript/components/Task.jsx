import React from 'react';
import { Link } from "react-router-dom";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: { description: "", status: false}};
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    
    const url = `/api/v1/show/${id}`;
    
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ task: response }))
      .catch(() => this.props.history.push("/tasks"));
  }

  deleteTask() {
    let ask = window.confirm("Are you sure you want to delete this task?");
    if (!ask) {
      return;
    }
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/tasks"))
      .catch(error => console.log(error.message));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    const { task } = this.state;
    const taskDescription = this.addHtmlEntities(task.description);
    
    return (
      <div className="">
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">{task.title}</h1>
          </div>
        </section>

        <div className="ui centered three column grid">
          <div className="column">
            <div className="ui segment">
              <h5>Task Description</h5>
              <div dangerouslySetInnerHTML={{
                __html: `${taskDescription}`
              }}
              />
              <div className="ui left dividing rail">
                <div className="ui segment">
                  <h5 className="mb-2">Statues:</h5>
                  <p>{task.status ? "Completed" : "Ongoing"}</p>
                </div>
              </div>
              <div className="ui right dividing rail">
                <div className="ui segment">
                  <h5>Categories:</h5>
                  <p>No categories created yet</p>
                </div>
              </div>
            </div>
          </div>
        </div><br/>
        <div className="container">
          <div className="center">
            <button type="button" className="ui basic red button" onClick={this.deleteTask}>Delete Task</button>
            {"  "}
            <Link to={"/task/" + task.id + "/edit"} className="ui basic blue button">Update Task</Link>
            {"  "}
            <Link to="/tasks" className="ui basic teal button">Back to Tasks</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Task