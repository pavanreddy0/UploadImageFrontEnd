import React, { Component } from "react";

import "../ImageInput/index.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    BASE_URL: "https://backend-tes-iolbjyrl7a-uc.a.run.app",
  };
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    // Redirect to home page if already logged in
    if (token && token.length > 0) {
      window.location.href = "/";
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  login = async () => {
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
    const res = await fetch(`${this.state.BASE_URL}/login`, requestOptions);
    // const res = await fetch("/login", requestOptions);

    if (res.status === 400) {
      alert("User not registered! Please Sign Up");
      window.location.href = "/signup";
    } else if (res.status === 401) alert("Incorrect password");
    else if (res.status === 500) {
      alert("Unable to login");
    } else {
      //   alert("Login Success!");
      const data = await res.json();
      console.log(data);
      localStorage.setItem("token", data["token"]);
      window.location.href = "/";
    }
  };

  render() {
    return (
      <div className="container text-center border py-3 my-3 bgColor">
        <h2 className="display-5 text-center"> Login Page </h2>
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
            <button className="btn btn-primary" onClick={this.login}>
              Login
            </button>
          </div>
          <div className="col-12 padding">
            Do not have an account? <a href="/signup">SignUp</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
