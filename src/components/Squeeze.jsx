const Squeeze = () => {
  return (
    <div className="wrapper">
      <div className="squeeze_wrapper">
        <div className="squeeze_header">
          <h2 id="main_title">Bike Loan</h2>
          <p id="header_desc">Apply for a bike loan in 5 minutes!</p>
        </div>
        <div className="squeeze_form">
          <div className="register">
            <form>
              <h4 id="register_signup">Register/Sign Up</h4>
              <label>Legal Name</label>
              <input type="text" id="first_name" placeholder="Legal Name" />
              <label>Email</label>
              <input type="email" id="email" placeholder="Email" />
              <label>Password</label>
              <input type="password" id="password" placeholder="Password" />
              <button type="submit">Register</button>
            </form>
          </div>
          <hr style={{ "marginTop": "40px", "marginBottom": "40px" }} />
          <div className="login">
            <form>
              <h4 id="login_">Login</h4>
              <label>Email</label>
              <input type="email" id="email" placeholder="Email" />
              <label>Password</label>
              <input type="password" id="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>
          <hr style={{ "marginTop": "40px", "marginBottom": "40px" }} />
          <div className="admin_login_text">
            <button id="admin_button" type="submit">Admin</button>
            <p style={{ "fontSize": "13px", "fontWeight": 900 }}>
              Click to login as admin
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Squeeze;