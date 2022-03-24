import React,{useState} from "react";
import { useNavigate} from "react-router-dom";

import {
  Link
} from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [pass,setPassword] = useState("");
  
   

  
  const login = async(e) =>{
    e.preventDefault();
    const item = {
      "email" : email,
      "password" : pass
  }
    
    console.log(item);
    let result = await fetch('http://localhost:52188/user/login',{
      method : 'POST',
      body : JSON.stringify(item),
      headers:{
        "Content-Type" : 'application/json',
        "Accept":'application/json'
      }
    })
    result = await result.json();
    
    if(result == "User" || result == "Admin"){
      sessionStorage.setItem("login-info",item.email);
      sessionStorage.setItem("role",result);
      navigate("/user/getProfile");
    }else{
      alert("Invalid User")
    }
    
  }

  
    return (
      <div className="wrapper">
        <div className="squeeze_wrapper">
          <div className="squeeze_header">
            <h2 id="main_title">
              <Link to="/">Bike Loan</Link>
            </h2>
            <p id="header_desc">Apply for a bike loan in 5 minutes!</p>
          </div>
          <div className="squeeze_form">
            <div className="login">
              <form onSubmit={login}>
                <h4 id="login_">Login</h4>
                <label>Email</label>
                <input type="email" id="txtEmail" placeholder="name@domain" required className="email" onChange={e=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" id="txtPassword" placeholder="Password" required  onChange={e=>setPassword(e.target.value)} />
                <button type="submit" id="loginButton">Login</button>
              </form>
            </div>
            <div className="not_a">
              <p>
                Not a user? &nbsp;
                <Link to="/user/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
