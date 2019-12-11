import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./Landing";
import Projects from "./Projects";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import Project from "./Project";
import Login from "./Login";
import Register from "./Register";
import Deletions from "./Deletions";
import Logins from "./Logins";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/deletions-report" component={Deletions} />
        <Route exact path="/logins-report" component={Logins} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/projects" component={Projects} />
        <Route path="/project" component={Project} />
        <Route exact path="/addproject" component={AddProject} />
        <Route path="/editproject" component={EditProject} />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  );
};

export default Routes;
