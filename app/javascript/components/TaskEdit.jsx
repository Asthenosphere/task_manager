import React from 'react';
import { Link } from "react-router-dom";
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

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;
    const _this = this;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      }).then(function(data) {
        _this.setState({
          title: data.title,
          description: data.description,
          status: data.status
        })
        }
    );
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
    const {
      match: {
        params: { id }
      }
    } = this.props;
    event.preventDefault();
    const url = `/api/v1/edit/${id}`;
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
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/task/${response.id}`))
      .catch(error => {
        window.alert("Task title duplicated, please try another one.");
        console.log(error)
      });
  }

  render() {
    return (
      <div>
        <div className="ui inverted menu">
          <Link to="/tasks" className="item">Tasks</Link>
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
            <h1 className="display-4">Update Task</h1>
            <h4>Update existing task that you've created earlier</h4>
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
                  <input type="text" defaultValue={this.state.title} name="title" id="taskTitle" className="form-control" required onChange={this.onChange}/>
                </div>
                <h5>Description</h5>
                <div className="field">
                  <label htmlFor="description"/>
                  <textarea className="form-control" id="description" defaultValue={this.state.description} name="description" rows="5" required onChange={this.onChange}/>
                </div><br/>
                <button type="submit" className="ui basic blue button">
                  Update Task
                </button>
                <Link to="/tasks" className="ui basic teal button">Back to Tasks</Link>
              </form><br/>
            </div>
          </div>
        </div><br/><br/>
        <Footer />
      </div>
    )
  }
}

export default TaskNew