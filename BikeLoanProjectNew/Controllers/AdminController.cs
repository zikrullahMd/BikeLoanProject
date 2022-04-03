using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;

namespace BikeLoanProjectNew.Controllers
{
    public class AdminController : ApiController
    {
        BikeLoanDBEntities entities = new BikeLoanDBEntities();
        [Route("admin/signup")]
        [HttpPost]
        public HttpResponseMessage Singup([FromBody] Admin admin)
        {
            System.Diagnostics.Debug.WriteLine(admin.email);
            System.Diagnostics.Debug.WriteLine(admin.password);
            try
            {
                entities.Admins.Add(admin);
                entities.SaveChanges();
            }
            catch (Exception dbEx)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, dbEx.Message);
            }
            var message = Request.CreateResponse(HttpStatusCode.OK, "admin added");
            message.Headers.Location = new Uri(Request.RequestUri + " " + admin.email);
            return message;
        }

        [Route("admin/login")]
        [HttpPost]
        public HttpResponseMessage login([FromBody] Login login)
        {
            AuthController auth = new AuthController();
            
            if (auth.isAdminPresent(login))
            {
                var message = Request.CreateResponse(HttpStatusCode.OK, "Admin");
                var user = entities.Users.FirstOrDefault(us => us.email == login.email);
                var admin = entities.Admins.FirstOrDefault(ad => ad.email == login.email);
                if (user != null)
                {
                    message.Headers.Location = new Uri(Request.RequestUri + "Valid user");
                }
                return message;
            }
            else if (auth.isAdminPresent(login))
            {
                var message = Request.CreateResponse(HttpStatusCode.OK, "Admin");
                var user = entities.Users.FirstOrDefault(us => us.email == login.email);
                var admin = entities.Admins.FirstOrDefault(ad => ad.email == login.email);
                if (admin != null)
                {
                    message.Headers.Location = new Uri(Request.RequestUri + "Valid admin");
                }
                return message;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid user");
            }
        }
    }
}
