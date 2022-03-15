using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;

namespace BikeLoanProject.Controllers
{
    public class UserController : ApiController
    {
        private static BikeLoanDBEntities entities = new BikeLoanDBEntities(); 
        
        [HttpPost]
        public HttpResponseMessage addUser([FromBody] User user)
        {
            entities.Users.Add(user);
            entities.SaveChanges();
            var message = Request.CreateResponse(HttpStatusCode.OK,user);
            message.Headers.Location = new Uri(Request.RequestUri+" "+user.email);
            return message;
        }
        
        [HttpGet]
        public HttpResponseMessage getUser(string email)
        {
            var user = entities.Users.FirstOrDefault(us => us.email == email);
            if(user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            var message = Request.CreateResponse(HttpStatusCode.OK,user);
            message.Headers.Location = new Uri(Request.RequestUri + " " + " No User found");

            return message;
        }

        [HttpGet]
        public IEnumerable<User> getUsers()
        {
            var users = entities.Users.ToList();
            if(users.Count == 0)
            {
                return Enumerable.Empty<User>();
            }

            return users;
        }

        [HttpPut]
        public HttpResponseMessage editUser(string email, [FromBody] User user)
        {
            User users = entities.Users.FirstOrDefault(us => us.email == email);
            if(user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,"No user found with this email");
            }
            users.email = user.email;
            users.password = user.password;
            users.username = user.username;
            users.mobileNumber = user.mobileNumber;
            users.userRole = user.userRole;
            entities.SaveChanges();

            var message = Request.CreateResponse(HttpStatusCode.OK, users);
            message.Headers.Location = new Uri(Request.RequestUri + " user edited successfully");

            return message;
        }

        [HttpDelete]
        public HttpResponseMessage deleteUser(string email)
        {
            var users = entities.Users.FirstOrDefault(us => us.email == email);
            if(users == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, " No user found with this email");
            }

            entities.Users.Remove(users);
            entities.SaveChanges();
        }
        
    }
}
