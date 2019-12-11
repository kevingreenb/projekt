import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../actions/auth";
import PropTypes from "prop-types";

import "../public/css/signin.css";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    loginerror: ""
  });

  const { name, email, password, password2, loginerror } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passowrds do not match");
    } else {
      register({ name, email, password }).then(res => {
        if (res === undefined) {
          setFormData({
            ...formData,
            loginerror: "Unable to register these credentials."
          });
        }
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/projects" />;
  }

  return (
    <Fragment>
      <form className="form-signin" onSubmit={e => onSubmit(e)}>
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
        <label htmlFor="inputName" className="sr-only">
          Your name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          id="inputName"
          className="form-control"
          placeholder="Your name..."
          onChange={e => onChange(e)}
          required
          autoFocus
        />
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
        <label htmlFor="inputPassword" className="sr-only">
          Confirm Password
        </label>
        <input
          type="password"
          name="password2"
          value={password2}
          id="inputPassword"
          className="form-control"
          placeholder="Confirm Password"
          onChange={e => onChange(e)}
          required
        />
        <div className="errorMessage">{loginerror}</div>
        <input type="submit" className="btn btn-primary" value="Register" />
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        <p className="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
