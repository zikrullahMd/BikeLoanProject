import React, { useState } from "react";
import {
  Link, useNavigate
} from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [userRole, setUserRole] = useState("");

  const registration = async (event) => {
    event.preventDefault();
    const item = { email, password, username, mobileNumber, userRole };

    // For HTTPS compliant
    //let result = await fetch('https://localhost:44334/user/signup',{
    // For HTTP complaint

    let result = await fetch('http://localhost:52188/user/signup', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })
    result = await result.json()
    console.log(result);
    if (result === "user added") {
      alert("hogaya")
      navigate("/");
    }
  }
  return (
    <div className="wrapper">
      <div className="squeeze_wrapper">
        <div className="squeeze_header">
          <h2 id="main_title">
            <Link to="/">Bike Loan</Link>
          </h2>
          <br />
          <p id="header_desc">Apply for a bike loan in 5 minutes!</p>
        </div>
        <div className="squeeze_form">
          <div className="register">
            <form onSubmit={registration}>
              <h4 id="register_">Register as user</h4>


              {/* Configure this role input however */}
              {/* START */}
              {/* #################### */}
              {/* #################### */}
              {/* #################### */}

              <label>Enter admin/user</label>
              <input type="text" id="admin/user" placeholder="Admin/User" required value={userRole} onChange={(e) => setUserRole(e.target.value)} />


              {/* #################### */}
              {/* #################### */}
              {/* #################### */}
              {/* END */}

              <label>Role</label>
              <select name="role" id="role" className="select_role_dropdown" required>
                <option value="user">User</option>
              </select>
              <label>Identity</label>
              <div className="username_email">
                <input type="text" id="username" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" id="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <label>Mobile number</label>
              <input type="text" id="mobileNumber" placeholder="Mobile number" required value={mobileNumber} onChange={(e) => setMobile(e.target.value)} />
              <label>Password</label>
              <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Confirm password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm password" required /><br /><br />
              <button type="submit" id="submitButton">Register</button>
            </form>
          </div>
          <br />
          <div className="not_a">
            <p>
              Already a user? &nbsp;
              <Link to="/user/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}