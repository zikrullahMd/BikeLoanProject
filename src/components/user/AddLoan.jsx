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
  const [loantype, setLoanType] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [aadhar, setAadhar] = useState();
  const [pan, setPan] = useState();
  const [salary, setSalary] = useState();
  const [amount, setAmount] = useState();
  const [month, setMonth] = useState();

  const add = async (event) => {
    event.preventDefault();
    console.log("clicked")
    let item = {
      "loandId": parseInt(mobile.substring(5, 9)),
      "loanType": loantype,
      "applicantName": name,
      "applicantAddress": address,
      "applicantMobile": mobile,
      "applicantEmail": email,
      "applicantAadhar": aadhar,
      "applicantPan": pan,
      "applicantSalary": salary,
      "loanAmount": amount,
      "loanRepaymentMongths": month
    };
    try {

      // let result = await fetch('http://localhost:52188/admin/addLoan',{
      //   method : 'POST',
      //   body : JSON.stringify(item),

      //   header : {
      //     "Content-Type" : 'application/json',
      //     "Accept":'application/json',

      //   }
      // })
      // result = await result.json();
      // if(result === 'loan added'){
      //   alert("success")
      // }else{
      //   alert("failed")
      // }
      // console.log(result);
      let result = await fetch('http://localhost:52188/admin/addLoan', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      })
      result = await result.json()
      console.log(result);
      if (result === "loan added") {
        alert("hogaya")
        navigate("/AddDocument");
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
              <input type="email" id="enterEmail" placeholder="name@domain" required onChange={e => setEmail(e.target.value)} />
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
          <form>
            <div >
              <label>Mobile number</label>
              <input type="text" id="enterMobile" placeholder="Mobile number" required onChange={e => setMobile(e.target.value)} />
              <label>Address</label>
              <input type="text" id="enterAddress" placeholder="Address" required onChange={e => setAddress(e.target.value)} />
              <label>Aadhar number</label>
              <input type="text" id="enterAadharNo" placeholder="#### #### #### ####" required onChange={e => setAadhar(e.target.value)} />
              <label>PAN number</label>
              <input type="text" id="enterPanNo" placeholder="#######" required onChange={e => setPan(e.target.value)} />
              <label>Loan repayment duration (in months)</label>
              <input type="text" id="enterMonths" placeholder="ex: 8 months" required onChange={e => setMonth(e.target.salary)} />
              {/*<div class="doc_button">
                <label>Supporting documents</label>
                  <button class="btn">Upload supporting documents</button>
                  <input type="file" name="myfile" required />
              </div>*/}
            </div>
            <div className="submit_documents" style={{ marginTop: "2rem" }}>
              <button onClick={add} type="submit" id="applyLoanButton">Apply for loan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}