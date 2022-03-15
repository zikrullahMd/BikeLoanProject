import React from "react";
import Navbar from "./Navbar";

export default class ViewLoan extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="wrapper">
          <p id="track_application_text">
            Track your loan application
          </p>
          <label>Enter your Loan ID</label>
          <input type="text" id="enterLoanId" placeholder="9 digit ID" ></input>
          <button type="submit" id="trackButton">Track</button>
        </div>
      </div>
    );
  }
}