import React from "react";
import {
  Link
} from "react-router-dom";

export default class Login extends React.Component {
  render() {
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
            <div className="login">
              <form>
                <h4 id="login_">Login as admin</h4>
                <label>Email</label>
                <input type="email" id="email" placeholder="name@domain" required className="email" />
                <label>Password</label>
                <input type="password" id="password" placeholder="Password" required /><br /><br />
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
}