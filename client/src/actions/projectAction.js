import axios from "axios";

import { PROJECT_CREATED, PROJECTS_LOADED } from "./types";
import { loadUser } from "./auth";

export const createProject = ({
  projectTitle,
  projectDescription,
  deliveryDate
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    projectTitle,
    projectDescription,
    deliveryDate
  });

  try {
    const res = await axios.post("/api/projects", body, config);

    dispatch({
      type: PROJECT_CREATED,
      payload: res.data
    });

    dispatch(loadUser());
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const loadProjects = () => async dispatch => {
  try {
    const res = await axios.get("/api/projects");

    dispatch({
      type: PROJECTS_LOADED,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.error(err.message);
  }
};

export const updateProject = (
  id,
  { projectTitle, projectDescription, deliveryDate }
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    projectTitle,
    projectDescription,
    deliveryDate
  });
  let url = "/api/projects" + id;
  try {
    await axios.patch(url, body, config);
  } catch (err) {
    console.error(err.message);
  }
};
