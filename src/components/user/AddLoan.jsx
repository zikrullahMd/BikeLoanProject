import React from "react";
import Navbar from "./Navbar";

export default class AddLoan extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="addloan_wrapper">
          <div className="addloan_form">
            <form>
              <div>
                <label>Applicant name</label>
                <input type="text" id="enterName" placeholder="Name" required />
                <label>Email</label>
                <input type="email" id="enterEmail" placeholder="name@domain" required />
                <label>Applicant salary (per annum)</label>
                <input type="text" id="enterSalary" placeholder="ex: $100,000" required />
                <label>Loan amount</label>
                <input type="text" id="enterAmount" placeholder="ex: $100,000" required />
                <label for="file_type">Pick a type:</label>
                <select name="file_type" id="chooseFile">
                  <option value="aadhar">Aadhar</option>
                  <option value="pan">PAN</option>
                  <option value="drivers_license">Driver's License</option>
                </select>
              </div>
            </form>
            <form>
              <div >
                <label>Mobile number</label>
                <input type="text" id="enterMobile" placeholder="Mobile number" required />
                <label>Aadhar number</label>
                <input type="text" id="enterAadharNo" placeholder="#### #### #### ####" required />
                <label>PAN number</label>
                <input type="text" id="enterPanNo" placeholder="#######" required />
                <label>Loan repayment duration (in months)</label>
                <input type="text" id="enterMonths" placeholder="ex: 8 months" required />
                <label>Supporting documents</label>
                <div class="doc_button">
                  <button class="btn">Upload supporting documents</button>
                  <input type="file" name="myfile" required />
                </div>
                <div className="submit_documents">
                  <button type="submit" id="uploadDocumentsButton">
                    Upload documents
                  </button>
                </div>
              </div>
            </form>
          </div>
          <button type="submit" id="applyLoanButton">
            Apply for loan
          </button>
        </div>
      </div>
    );
  }
}