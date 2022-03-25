import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function AddLoan() {

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("login-info") == null) {
      alert("Please login first")
      navigate("/");
    }
  })
  return (
    <div>
      <Navbar />
      <div className="addloan_wrapper">
        <div className="addloan_form">
          <form onSubmit={add}>
            <div>
              <label htmlFor="file_type">Pick a type:</label>
              <select name="file_type" id="chooseFile" onChange={e => setLoanType(e.target.value)}>
                <option value="aadhar">Aadhar</option>
                <option value="pan">PAN</option>
                <option value="drivers_license">Driver's License</option>
              </select>
            </div>
          </form>
          <form>
            <div >
              <div class="doc_button">
                <label>Supporting documents</label>
                <button class="btn">Upload supporting documents</button>
                <input type="file" name="myfile" required />
              </div>
              <div className="submit_documents">
                <button type="submit" id="applyLoanButton">Apply for loan</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}