import React from "react";

export default class Dashboard extends React.Component {

  applicant = {
    name: ["Varshith Thota", "Jennifer Lopez"],
    email: ["varshiththota@bikeloan.com", "jenniferlpz@bikeloan.com"],
    loan_amt: ["10,000,000", "100,000,000"]
  }

  render() {
    return (
      <div className="display_users_wrapper">
        <div className="count_of_applications">
          <p id="count_number"><strong>2</strong> applicant(s) to verify</p>
        </div>
        <div className="applicants_list">
          <div className="applicant_deets">
            <p id="applicant_name">
              {this.applicant.name[0]}
            </p>
            <p>
              Applicant email: {this.applicant.email[0]}
            </p>
            <p>
              Loan amount: {this.applicant.loan_amt[0]}
            </p>
            <button className="download_files_btn">Download files</button> &nbsp;
            <button className="approve_btn">Approve</button> &nbsp;
            <button className="reject_btn">Reject</button> &nbsp;
          </div>
          <br />
          <div className="applicant_deets">
            <p id="applicant_name">
              {this.applicant.name[1]}
            </p>
            <p>
              Applicant email: {this.applicant.email[1]}
            </p>
            <p>
              Loan amount: {this.applicant.loan_amt[1]}
            </p>
            <button className="download_files_btn">Download files</button> &nbsp;
            <button className="approve_btn">Approve</button> &nbsp;
            <button className="reject_btn">Reject</button> &nbsp;
          </div>
        </div>
      </div>
    );
  }
}