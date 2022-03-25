import React,{useState} from "react";
import {
  Link,useNavigate
} from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const[email,setEmail] = useState();
  const[password,setPassword] = useState();
  const[mobileNumber,setMobile] = useState();
  const[userRole,setRole] = useState();

  const registration = async(e) =>{
    e.preventDefault();
    let item = {email,password,mobileNumber,userRole}
    console.log(item);
    try{
        let result = await fetch('http://localhost:52188/admin/signup', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      })
      result = await result.json()
      console.log(result);
      if (result === "admin added") {
        alert("hogaya")
        navigate("/admin/Login")
      }
    }catch(err){
      console.log(err);
    }
    
  }

    return (
      <div className="wrapper">
        <div className="squeeze_wrapper">
          <div className="squeeze_header">
            <h2 id="main_title">
              <Link to="/">Bike Loan</Link>
            </h2><br />
            <p id="header_desc">Apply for a bike loan in 5 minutes!</p>
          </div>
          <div className="squeeze_form">
            <div className="register">
              <form onSubmit={registration}>
                <h4 id="register_">Register as admin</h4>
                <label>Role</label>
                <input type="text" id="role" placeholder="Role" required onChange={e=>setRole(e.target.value)}/>
                <label>Email</label>
                <div className="username_email">
                  <input type="email" id="email" placeholder="Email" required onChange={e=>setEmail(e.target.value)}/>
                </div>
                <label>Mobile number</label>
                <input type="text" id="mobileNumber" placeholder="Mobile number" required onChange={e=>setMobile(e.target.value)}/>
                <label>Password</label>
                <input type="password" id="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                <label>Confirm password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm password" required />
                <br /><br />
                <button type="submit" id="admin_button">Register</button>
              </form>
            </div>
            <br />
            <div className="not_a">
              <p>
                Already an admin? &nbsp;
                <Link to="/admin/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}