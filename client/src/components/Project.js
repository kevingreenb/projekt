import React, { Fragment, useState, useEffect } from "react";
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

function Project({ isAuthenticated, username, history, updateProject }) {
  var today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    deliveryDate: "",
    posts: [],
    text: ""
  });

  let {
    projectTitle,
    projectDescription,
    deliveryDate,
    posts,
    text
  } = formData;
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

  const postComment = async e => {
    let object = { post: { username: "Nala", text } };
    url = "/api/projects/post/" + id;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token
      },
      method: "post",
      body: JSON.stringify(object)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Error updating.");
        }
      })
      .then(res => {
        history.push(url);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deletePost = async (postId, formData, setFormData) => {
    var result = window.confirm("Want to delete?");
    if (result) {
      let object = { postId };
      url = "/api/projects/post/delete/" + id;
      await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token
        },
        method: "post",
        body: JSON.stringify(object)
      });
      setFormData({
        ...formData,
        posts: posts.filter(post => post._id !== postId)
      });
    } else {
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { projects } = useDataFetcher();
  if (projects && loading) {
    projectTitle = projects.projectTitle;
    projectDescription = projects.projectDescription;
    posts = projects.posts;
    if (projects.deliveryDate) {
      deliveryDate = projects.deliveryDate.substring(0, 10);
      loading = false;
      setFormData({
        projectTitle,
        projectDescription,
        deliveryDate,
        posts,
        text
      });
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
            disabled={true}
          />
          <h4>Delivery Date</h4>
          <input
            type="date"
            className="form-control"
            name="deliveryDate"
            value={deliveryDate}
            min={today}
            required
            disabled={true}
          />
          <h4>Description</h4>
          <textarea
            name="projectDescription"
            value={projectDescription}
            className="form-control"
            rows="10"
            required
            disabled={true}
          ></textarea>
        </form>
        <br />
        <br />
        <br />
        {posts ? <h4>Comments</h4> : null}
        {posts ? (
          posts.map(function(post, index) {
            return (
              <Fragment key={index}>
                {post.username} said:
                <div className="row">
                  <textarea
                    name="comments"
                    className="form-control col-11 mr-auto"
                    rows="3"
                    required
                    value={post.text}
                    disabled={true}
                  ></textarea>{" "}
                  <button
                    id={post._id}
                    className="btn btn-dark col-1 ml-auto"
                    onClick={e =>
                      deletePost(e.target.id, formData.posts, setFormData)
                    }
                  >
                    x
                  </button>
                  <br />
                </div>
              </Fragment>
            );
          })
        ) : (
          <div>Crap</div>
        )}
        <form onSubmit={e => postComment(e)}>
          <h4>Post a Comment</h4>
          <textarea
            name="text"
            className="form-control"
            rows="3"
            required
            value={text}
            onChange={e => onChange(e)}
          ></textarea>
          <input type="submit" className="btn btn-dark" value="Post" />
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

export default connect(mapStateToProps, { updateProject })(Project);
