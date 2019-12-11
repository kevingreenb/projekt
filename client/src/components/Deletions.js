import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import Navbar from "./Navbar";

import "../public/css/reports.css";

function useDataFetcher() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    fetch("/api/projects/deletions", {
      headers: {
        "x-auth-token": localStorage.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Error fetching entries.");
        }
      })
      .then(entries => {
        setEntries(entries);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return { entries, setEntries };
}

function Deletions({ isAuthenticated }) {
  const { entries } = useDataFetcher();
  if (isAuthenticated === false) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <h1>Deletions Report</h1>
      <table className="container reportsTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Project Title</th>
            <th>Delivery Date</th>
            <th>Deletion Time</th>
          </tr>
        </thead>
        <tbody>
          {entries ? (
            entries.map(function(entry, index) {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{entry.username}</td>
                  <td>{entry.projectTitle}</td>
                  <td>
                    {" "}
                    <Moment format="YYYY/MM/DD">
                      {moment.utc(entry.deliveryDate)}
                    </Moment>
                  </td>
                  <td>{entry.timestamp}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Loading</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Deletions);
