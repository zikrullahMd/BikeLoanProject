import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom"

export default function ViewLoan() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("login-info") == null) {
      alert("please login first")
      navigate("/");
    }
  })

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