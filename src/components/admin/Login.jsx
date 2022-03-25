import React,{useState} from "react";
import {
  Link, useNavigate
} from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const login = async (e) => {
    e.preventDefault();
    const item = {
      "email": email,
      "password": pass
    }

    console.log(item);
    let result = await fetch('http://localhost:52188/admin/login', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })

    result = await result.json();

    if (result == "User" || result == "Admin") {
      sessionStorage.setItem("login-info", item.email);
      sessionStorage.setItem("role", result);
      navigate("/admin/getAllLoans");
    } else {
      alert("Invalid User");
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
          </div>
          <div className="squeeze_form">
            <div className="login">
              <form onSubmit={login}>
                <h4 id="login_">Admin</h4>
                <label>Email</label>
                <input type="email" id="email" placeholder="name@domain" required className="email" onChange={e=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" id="password" placeholder="Password" required onChange={e=>setPassword(e.target.value)} /><br /><br />
                <button type="submit" id="admin_button">Login</button>
              </form>
            </div>
            <br />
            <div className="not_a">
              <p>
                Didn't register as admin yet? &nbsp;
                <Link to="/admin/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}