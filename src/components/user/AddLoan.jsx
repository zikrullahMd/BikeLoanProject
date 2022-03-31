import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate ,Link} from "react-router-dom";
import AddDocument from '../user/AddDocument'

export default function AddLoan() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("login-info") == null) {
      alert("Please login first")
      navigate("/");
    }
  })
  const [loanId,setLoanId] = useState();
  const [loantype, setLoanType] = useState();
  const [applicantName, setName] = useState();
  const [applicantAddress, setAddress] = useState();
  const [applicantMobile, setMobile] = useState();
  const [applicantEmail, setEmail] = useState();
  const [applicantAadhar, setAadhar] = useState();
  const [applicantPan, setPan] = useState();
  const [applicantSalary, setSalary] = useState();
  const [loanAmount, setAmount] = useState();
  const [loanRepaymentMonths, setMonth] = useState();


  const add = async (event) => {
    const status = "Submitted";
    event.preventDefault();
    let item = {
      loanId ,
      loantype ,
      applicantName ,
      applicantAddress ,
      applicantMobile ,
      applicantEmail ,
      applicantAadhar ,
      applicantPan ,
      applicantSalary ,
      loanAmount ,
      loanRepaymentMonths ,
      status
    };
    try {
      let result = await fetch('http://localhost:54754/admin/addLoan', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      })
      result = await result.json()
      console.warn("result",result);
      if (result !== null ) {
        alert("Add Documents")
        navigate("/user/AddDocument");
      }
    } catch (err) {
      console.log(err);
      alert("Not possible.")
    }
  }

  return (
    <div>
      <Navbar />
      <div className="addloan_wrapper">
        <div className="addloan_form">
          <form >
            <div>
              <label>Applicant name</label>
              <input type="text" id="enterName" placeholder="Name" required onChange={e => setName(e.target.value)} />
              <label>Email</label>
              <input type="email" id="enterEmail" placeholder="name@domain" required onChange={(e) => setEmail(e.target.value)} />
              <label>Applicant salary (per annum)</label>
              <input type="text" id="enterSalary" placeholder="ex: $100,000" required onChange={e => setSalary(e.target.value)} />
              <label>Loan amount</label>
              <input type="text" id="enterAmount" placeholder="ex: $100,000" required onChange={e => setAmount(e.target.value)} />
              <label htmlFor="file_type">Pick a type:</label>
              <select name="file_type" id="chooseFile" onChange={e => setLoanType(e.target.value)}>
                <option value="aadhar">Aadhar</option>
                <option value="pan">PAN</option>
                <option value="drivers_license">Driver's License</option>
              </select>
            </div>
          </form>
          <form onSubmit={add}>
            <div >
              <label>Mobile number</label>
              <input type="text" id="enterMobile" placeholder="Mobile number" required onChange={e => setMobile(e.target.value)} />
              <label>Address</label>
              <input type="text" id="enterAddress" placeholder="Address" required onChange={e => setAddress(e.target.value)} />
              <label>Aadhar number</label>
              <input type="text" id="enterAadharNo" placeholder="#### #### #### ####" required onChange={(e) => {setAadhar(e.target.value) ; setLoanId(e.target.value.substring(5,9))}} />
              <label>PAN number</label>
              <input type="text" id="enterPanNo" placeholder="#######" required onChange={e => setPan(e.target.value)} />
              <label>Loan repayment duration (in months)</label>
              <input type="text" id="enterMonths" placeholder="ex: 8 months" required onChange={e => setMonth(e.target.value)} />
            </div>
            <div className="submit_documents" style={{ marginTop: "2rem" }}>
              <button type="submit" id="applyLoanButton">Apply for loan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}