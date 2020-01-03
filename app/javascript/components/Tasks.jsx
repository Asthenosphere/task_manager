import React from "react";
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import bg from './polygon.jpeg'

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tasks: response }))
      .catch(() => this.props.history.push("/"));
  }
  
  render() {
    const { tasks } = this.state;
    const allTasks = tasks.map((task, index) => (
      <div key={index} className="col-md-5 col-lg-3">
        <div className="ui stacked card mb-5">
          <div className="content">
            <div className="header">{task.title}</div>
            <div className="description">{task.description}</div>
          </div>
          <div className="extra content">
            <Link to={`/task/${task.id}`} className="ui basic orange button">
              View Task
            </Link>
          </div>
        </div>
      </div>
    ));
    const noTask = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No tasks created yet. <Link to="/new_task">New Task</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">All Tasks</h1>
            <h4>
              Listing all tasks created
            </h4>
          </div>
        </section>
        <div className="center">
          <main className="container">
            <div className="center">
              <Link to="/new_task" className="ui basic blue button">
                Create New Task
              </Link>
            </div><br/>
            <div className="row">
              {tasks.length > 0 ? allTasks : noTask}
            </div>
            <Link to="/" className="ui basic teal button">
              Home
            </Link>
          </main>
        </div>
      </>
    )
  }
}

export default Tasks