import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updateProject } from "../actions/projectAction";

let url = window.location.pathname;
let id = url.substring(url.lastIndexOf("/") + 1);
let loading = true;
function useDataFetcher() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    url = "/api/projects/" + id;
    fetch(url, {
      headers: {
        "x-auth-token": localStorage.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Error fetching projects.");
        }
      })
      .then(projects => {
        setProjects(projects);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return { projects, setProjects };
}

function EditProject({ isAuthenticated, username, history, updateProject }) {
  var today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    deliveryDate: ""
  });

  let { projectTitle, projectDescription, deliveryDate } = formData;
  const onSubmit = async e => {
    e.preventDefault();
    url = "/api/projects/" + id;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token
      },
      method: "post",
      body: JSON.stringify({ projectTitle, projectDescription, deliveryDate })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Error updating.");
        }
      })
      .then(res => {
        history.push("/projects");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { projects } = useDataFetcher();
  if (projects && loading) {
    projectTitle = projects.projectTitle;
    projectDescription = projects.projectDescription;
    if (projects.deliveryDate) {
      deliveryDate = projects.deliveryDate.substring(0, 10);
      loading = false;
      setFormData({ projectTitle, projectDescription, deliveryDate });
    }
  }
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
            value={projectTitle ? projectTitle : ""}
            className="form-control"
            placeholder="Your project title"
            required
            onChange={e => onChange(e)}
          />
          <h4>Delivery Date</h4>
          <input
            type="date"
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
          <input type="submit" className="btn btn-dark" value="Save" />
          <a href="/projects" className="btn btn-dark">
            Cancel
          </a>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { updateProject })(EditProject);
