import React from "react";
import "../public/css/landing.css";
import Navbar from "./Navbar";

function Landing() {
  return (
    <div>
      <Navbar />
      <div className="container text-dark main-container">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to Projekt</h1>
          <p className="lead">
            Projekt is a simple app to help you manage your projects. Keep track
            of your portfolio, post updates, collaborate with others and deliver
            on time.
          </p>
          <p>
            This web app was built with web technologies such as Node, Express
            React, MongoDB and Boostrap.
          </p>
          <a
            className="btn btn-dark btn-lg"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            role="button"
          >
            Let's Roll
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
