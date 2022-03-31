import React,{useEffect,useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import User from '../admin/User'
export default function Dashboard(){


  const navigate = useNavigate();
  const[loan,setLoans] = useState([]);


  useEffect(()=>{
    if(sessionStorage.getItem("login-info") == null || sessionStorage.getItem("role") != "Admin"){
      alert("Please login")
      navigate("/")
    }
    
    fetch("http://localhost:54754/admin/getAllLoans",{
      method : "GET",
        headers : {
          "Content-Type" : 'application/json',
          'Accept' : 'application/json'
        }
      })
      .then((res)=>res.json())
      .then((result)=>{
        localStorage.setItem("loan",JSON.stringify(result))
        console.log(result);
      })
      .catch((err)=>console.log(err))
  },[])

  const ar = JSON.parse(localStorage.getItem("loan"));
  
    return (
      <div>
        <div className="display_users_wrapper">
          <div className="count_of_applications">
            <p id="count_number"><strong>{ar.length}</strong> applicant(s) to verify</p>
          </div>
        </div>
        {ar.map((e)=>
          <User data={e} id={e.loanId}/>
        )}
      </div>
    )
}
  