import React from "react";
import {
  Link
} from "react-router-dom";

export default class Signup extends React.Component {
  render() {
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
            <div className="register">
              <form>
                <h4 id="register_">Register</h4>
                <label>Enter admin/user</label>
                <input type="text" id="admin/user" placeholder="Admin/User" required />
                <label>Identity</label>
                <div className="username_email">
                  <input type="text" id="username" placeholder="Username" required />
                  <input type="email" id="email" placeholder="Email" required />
                </div>
                <label>Mobile number</label>
                <input type="text" id="mobileNumber" placeholder="Mobile number" required />
                <label>Password</label>
                <input type="password" id="password" placeholder="Password" />
                <label>Confirm password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm password" required />
                <button type="submit" id="submitButton">Register</button>
              </form>
            </div>
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
}