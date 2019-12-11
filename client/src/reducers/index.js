import { combineReducers } from "redux";
import auth from "./auth";
import projectReducer from "./projectReducer";

export default combineReducers({
  auth,
  projectReducer
});
