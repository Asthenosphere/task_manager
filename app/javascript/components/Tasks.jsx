import React from "react";
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import Footer from "./Footer";
import city from './city.jpeg'

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
            <div className="header">
              {task.title}
            </div>
            <div className="description">{task.description}</div>
            {task.status ?
              <div className="ui green basic pointing label">Completed</div>
              :
              <div className="ui red basic pointing label">Ongoing</div>
            }
          </div>
          <div className="extra content">
            <Link to={`/task/${task.id}`} className="ui basic orange button">
              View Task
            </Link>
          </div>
        </div>
      </div>
    ));

    return (
      <>
        <div className="ui inverted menu">
          <a className="active item">Tasks</a>
          <Link to="/new_task" className="item">
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
            </div><br/><br/>
            <div className="row">
              {allTasks}
            </div>
            <Link to="/" className="ui basic teal button">
              Home
            </Link>
          </main>
        </div><br/><br/><br/>
        <Footer />
      </>
    )
  }
}

export default Tasks