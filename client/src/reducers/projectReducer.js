import { PROJECT_CREATED, PROJECTS_LOADED } from "../actions/types";

const initialState = {
  posted: false,
  projects: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROJECT_CREATED:
      return {
        ...state,
        posted: true,
        project: payload
      };
    case PROJECTS_LOADED:
      return {
        ...state,
        projects: payload
      };
    default:
      return state;
  }
}
