import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import Navbar from "./Navbar";
import { Stack } from "../utils/Stack";
import { createProject } from "../actions/projectAction";
import "../public/css/projects.css";

let initialProjects = [];
let stack = new Stack();

function useDataFetcher() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("/api/projects/", {
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
        if (initialProjects.length < 1) {
          initialProjects = [...projects];
        }
        setProjects(projects);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return { projects, setProjects };
}

function deleteProject(id, username, projects, setProjects, setUndos) {
  var result = window.confirm("Are you sure you want to delete the project?");
  if (result) {
    stack.insert(projects.filter(project => project._id === id));
    setUndos(stack);
    let url = "/api/projects/" + id;
    fetch(url, {
      headers: {
        "x-auth-token": localStorage.token
      },
      method: "delete"
    }).then(res => {
      let { projectTitle, deliveryDate } = projects.find(
        project => project._id === id
      );
      let url = "/api/projects/deletion";
      let body = { username, projectTitle, deliveryDate };
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token
        },
        method: "post",
        body: JSON.stringify(body)
      }).then(res => {
        return res.json();
      });
      setProjects(projects.filter(project => project._id !== id));
    });
  } else {
  }
}

function onSubmit(e, projects, setProjects, term, initialProjects) {
  e.preventDefault();
  projects = [...initialProjects];
  setProjects(
    projects.filter(project =>
      project.projectTitle.toLowerCase().includes(term.toLowerCase())
    )
  );
}

function Projects({ isAuthenticated, username, createProject, history }) {
  const { projects, setProjects } = useDataFetcher();
  const [undos, setUndos] = useState([]);
  //ignore this if statement
  if (1 === 2) {
    console.log(undos);
  }
  if (isAuthenticated === false) {
    return <Redirect to="/login" />;
  }
  const undoDeletion = async e => {
    if (stack.size === 0) {
      alert("Nothing to undo");
    } else {
      let readd = stack.remove();
      const { projectTitle, projectDescription, deliveryDate } = readd.value[0];
      createProject({
        projectTitle,
        projectDescription,
        deliveryDate
      }).then(res => {
        console.log(res);
        projects.unshift(res);
        setProjects(projects);
      });
    }
  };

  return (
    <div>
      <Navbar />
      <main role="main" className="container">
        <div className="d-flex align-items-center p-3 my-3 text-white-50 rounded box-shadow ">
          <div className="lh-100">
            <h1 className="mb-0 text-white lh-100">Projekt</h1>
            <small>Since 2019</small>
          </div>
          <form
            className="form-inline my-2 my-lg-0 ml-auto"
            onSubmit={e =>
              onSubmit(
                e,
                projects,
                setProjects,
                document.getElementById("searchbox").value,
                initialProjects
              )
            }
          >
            <input
              className="form-control mr-sm-2"
              id="searchbox"
              type="search"
              placeholder="Search Project Title"
              aria-label="Search"
            ></input>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <div className="my-3 p-3 bg-white rounded box-shadow">
          <div className="container">
            <div className="row">
              <h6 className="border-bottom border-gray pb-2 mb-0 col-8">
                Projects
              </h6>
              <div className="ml-auto col-2">
                <a href="/addproject" className="text-dark ml-auto darks">
                  Add Project <i className="fas fa-plus-square darks"></i>
                </a>
              </div>
              <div className="ml-auto col-2">
                <button
                  className="text-light ml-auto btn btn-dark"
                  onClick={e => undoDeletion(setUndos)}
                >
                  Undo Deletion
                </button>
              </div>
            </div>
          </div>
          {projects ? (
            projects.map(function(project, index) {
              return (
                <div className="media text-muted pt-3" key={index}>
                  <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <h2>
                      <a href={"/project/" + project._id} className="darks">
                        {project.projectTitle}
                      </a>
                    </h2>
                    <br />
                    <br />
                    <strong>{project.projectDescription}</strong>
                    <br />
                    Delivery Date:{" "}
                    <Moment format="YYYY/MM/DD">
                      {moment.utc(project.deliveryDate)}
                    </Moment>
                    <br />
                    Created Date:{" "}
                    <Moment format="YYYY/MM/DD">
                      {moment.utc(project.createdDate)}
                    </Moment>
                    <br />
                    Created By: {project.createdBy}
                    <br />
                    Project ID: {project._id}
                  </div>
                  <a
                    href={"/editproject/" + project._id}
                    className="btn btn-dark"
                  >
                    Edit <i className="fas fa-edit"></i>
                  </a>
                  <button
                    id={project._id}
                    onClick={e =>
                      deleteProject(
                        e.target.id,
                        username.email,
                        projects,
                        setProjects,
                        setUndos
                      )
                    }
                    className="btn btn-dark"
                  >
                    Delete <i className="fas fa-trash"></i>
                  </button>
                </div>
              );
            })
          ) : (
            <div>Loading</div>
          )}
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user
});

export default connect(mapStateToProps, { createProject })(Projects);
