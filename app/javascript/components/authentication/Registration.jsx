import React from 'react';
import axios from 'axios';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { username, email, password, password_confirmation } = this.state;
    axios.post("http://localhost:3000/registrations", {
      user: {
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    },
      { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuthentication(response.data)
        }
      })
      .catch(error => {
        console.log("registration error", error)
      });
    event.preventDefault();
  }

  handleChange(event) {
    console.log("handle change", event);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Re-enter Password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}