import React, { useState } from "react";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createProject } from "../actions/projectAction";
import PropTypes from "prop-types";

const AddProject = ({ isAuthenticated, createProject, history }) => {
  var today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    deliveryDate: ""
  });

  const { projectTitle, projectDescription, deliveryDate } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await createProject({
      projectTitle,
      projectDescription,
      deliveryDate
    });
    history.push("/projects");
  };

  if (isAuthenticated === false) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <form onSubmit={e => onSubmit(e)}>
          <h4>Project Title</h4>
          <input
            name="projectTitle"
            value={projectTitle}
            className="form-control"
            placeholder="Your project title"
            required
            onChange={e => onChange(e)}
          />
          <h4>Delivery Date</h4>
          <input
            type="date"
            id="datepicker"
            className="form-control"
            name="deliveryDate"
            value={deliveryDate}
            min={today}
            required
            onChange={e => onChange(e)}
          />
          <h4>Description</h4>
          <textarea
            name="projectDescription"
            value={projectDescription}
            className="form-control"
            rows="10"
            required
            onChange={e => onChange(e)}
          ></textarea>
          <input type="submit" className="btn btn-dark" value="Create" />
          <a href="/projects" className="btn btn-dark">
            Cancel
          </a>
        </form>
      </div>
    </div>
  );
};

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { createProject })(AddProject);
