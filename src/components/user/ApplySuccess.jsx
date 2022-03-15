import React from "react";
import Navbar from "./Navbar";

export default class ApplySuccess extends React.Component {

  loan_idx = {
    id: "032882123"
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="wrapper">
          <p id="loan_success_msg">
            You have applied for loan successfully!
          </p>
          <br />
          <p style={{ "color": "black", "fontFamily": "Helvetica", "fontSize": "18px" }}>
            <strong>You're all set!</strong>
            <p>Expect an email from us within 24 hours after a decision is made on your loan application.</p>
          </p>
          <br />
          <p id="loan_sucess_id">
            Your Loan ID is: <strong>{this.loan_idx.id}</strong>
          </p>
        </div>
      </div>
    );
  }
}