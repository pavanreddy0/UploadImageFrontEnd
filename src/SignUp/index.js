import React, { Component } from "react";

import "../ImageInput/index.css";
class SignUp extends Component {
  state = {
    email: "",
    password: "",
    BASE_URL: "https://backend-tes-iolbjyrl7a-uc.a.run.app",
  };
  componentDidMount = () => {};

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  signup = async () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(requestOptions);
    const res = await fetch(`${this.state.BASE_URL}/signup`, requestOptions);
    // const res = await fetch("/signup", requestOptions);

    if (res.status === 400) {
      alert("User already registered! Please login");
      window.location.href = "/login";
    } else if (res.status !== 201) alert("Failed to Sign Up");
    else {
      alert("Sign Up Success! Please login");
      window.location.href = "/login";
    }
  };

  render() {
    return (
      <div className="container text-center border py-3 my-3 bgColor">
        <h2 className="display-5 text-center"> Sign Up Page </h2>
        <div className="row">
          <div className="col-6 padding">Email</div>
          <div className="col-6 padding">
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-6">Password</div>
          <div className="col-6">
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-12 padding">
            <button className="btn btn-primary" onClick={this.signup}>
              Sign Up
            </button>
          </div>
          <div className="col-12 padding">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
