import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <header className="navbar">
          <div className="navbar__title navbar__item">Bike Loan</div>
          <div className="navbar__item" id="applyLoan">
            <Link to="/">Apply Loan</Link>
          </div>
          <div className="navbar__item" id="loanStatus">
            <Link to="/">Loan Status</Link>
          </div>
          <div className="navbar__item" id="profile">
            <Link to="/">Profile</Link>
          </div>
          <div className="navbar__item" id="logout">
            <Link to="/">Logout</Link>
          </div>
        </header>
      </div>
    );
  }
}