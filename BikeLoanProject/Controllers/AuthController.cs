using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;

namespace BikeLoanProject.Controllers
{
    public class AuthController : ApiController
    {
        
        public bool isUserPresent([FromBody]Login login)
        {
            BikeLoanDBEntities entities = new BikeLoanDBEntities();
            //User email = entities.Users.FirstOrDefault(e => login.email.Equals(e));

            User email = entities.Users.Where(e => login.email.Equals(e.email)).FirstOrDefault();
            User pass = entities.Users.Where(e => login.password.Equals(e.password)).FirstOrDefault();
            //User pass = entities.Users.FirstOrDefault(e => login.password.Equals(e));
            return email != null && pass != null;
        }
        //Change [FromBody] while integration with front end
        public bool isAdminPresent([FromBody]Login login)
        {
            BikeLoanDBEntities entities = new BikeLoanDBEntities();
            Admin email = entities.Admins.FirstOrDefault(e => login.email.Equals(e));
            Admin pass = entities.Admins.FirstOrDefault(e => login.password.Equals(e));
            return email != null && pass != null;
        }

    }
}
