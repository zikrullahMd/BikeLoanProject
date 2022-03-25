import React,{useEffect,useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
export default function Dashboard(){
  const navigate = useNavigate();
  const[loan,setLoans] = useState({"loanId":159,
  "loantype": "",
  "applicantName": "",
  "applicantAddress": "",
  "applicantMobile": "",
  "applicantEmail": "",
  "applicantAadhar": "",
  "applicantPan": "",
  "applicantSalary": "",
  "loanAmount": "",
  "loanRepaymentMongths": ""});


  useEffect(()=>{
    if(sessionStorage.getItem("login-info") == null || sessionStorage.getItem("role") != "Admin"){
      alert("Please login")
      navigate("/")
    }
    loans();
  },[])

  async function loans(e){
    //e.preventDefault();
    try{
      let result = await fetch('http://localhost:52188/admin/getAllLoans',{
        method : 'GET',
        header : {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        }
      })
      result = await result.json();
      setLoans(result);
      console.log(loan);
    }catch(err){
      console.log(err);
    }
  }

  
    return (
      <div className="display_users_wrapper">
        <div className="count_of_applications">
          <p id="count_number"><strong>2</strong> applicant(s) to verify</p>
        </div>
        <div className="applicants_list">
              <div className="applicant_deets">
                <p id="applicant_name">
                  {loan[0].applicantName}
                </p>
                <p>
                  Applicant email: mohmmedzikrullah@gmail.com
                </p>
                <p>
                  Loan amount: 10000
                </p>
                <button className="download_files_btn">Download files</button> &nbsp;
                <button className="approve_btn">Approve</button> &nbsp;
                <button className="reject_btn">Reject</button> &nbsp;
              </div>
              <br />
              </div>
        </div>
        
    );
    }
  