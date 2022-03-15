import React from "react";
import Navbar from "./Navbar";

export default class ViewProfile extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="wrapper">
          <p id="profile_info_text">
            Profile information
          </p>
          <div className="profiles_content">
            <div>
              <p id="name">
                <strong>Name:</strong> &nbsp; Varshith Thota
              </p>
            </div>

            <div>
              <p id="address">
                <strong>Address:</strong> ###
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}