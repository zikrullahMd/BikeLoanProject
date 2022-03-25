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
            </h2><br />
            <p id="header_desc">Apply for a bike loan in 5 minutes!</p>
          </div>
          <div className="squeeze_form">
            <div className="register">
              <form>
                <h4 id="register_">Register as admin</h4>
                <label>Role</label>
                <select name="role" id="role" className="select_role_dropdown" required>
                  <option value="admin">Admin</option>
                </select>
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
}