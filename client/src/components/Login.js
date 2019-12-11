import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

import "../public/css/signin.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loginerror: ""
  });

  const { email, password, loginerror } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password).then(res => {
      if (res === undefined) {
        setFormData({ ...formData, loginerror: "Invalid credentials" });
      }
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/projects" />;
  }

  return (
    <Fragment>
      <div className="container">
        <form className="form-signin" onSubmit={e => onSubmit(e)}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            onChange={e => onChange(e)}
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            onChange={e => onChange(e)}
            required
          />
          <div className="errorMessage">{loginerror}</div>
          <input type="submit" className="btn btn-primary" value="Login" />
          <p className="my-1">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p className="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
