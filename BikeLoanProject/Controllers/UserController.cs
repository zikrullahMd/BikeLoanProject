using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;
using BikeLoanProject.Controllers;
using System.Web.Http.Cors;
using System.Data.Entity.Validation;

namespace BikeLoanProject.Controllers
{
    [EnableCors("*","*","*")]
    public class UserController : ApiController
    {
        private static BikeLoanDBEntities entities = new BikeLoanDBEntities(); 
        
        [Route("user/signup")]
        [HttpPost]
        public HttpResponseMessage signup(User user)
        {
            
                
                
            try
            {
                entities.Users.Add(user);
                entities.SaveChanges();
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string msg = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        // raise a new exception nesting
                        // the current instance as InnerException
                        raise = new InvalidOperationException(msg, raise);
                    }
                }
                throw raise;
            }
            var message = Request.CreateResponse(HttpStatusCode.OK, "user added");
            message.Headers.Location = new Uri(Request.RequestUri + " " + user.email);
            return message;
        }

        [Route("user/login")]
        public bool login(string email, string pass)
        {
            AuthController auth = new AuthController();
            Login login = new Login()
            {
                email = email,
                password = pass
            };

            return auth.isUserPresent(login);
        }
        
        [Route("user/getProfile")]
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


        [Route("user/editProfile")]
        [HttpPut]
        public HttpResponseMessage editUser(string email, [FromBody] User user)
        {
            User users = entities.Users.FirstOrDefault(us => us.email == email);
            if(users == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,"No user found with this email");
            }
            
            users.password = user.password;
            users.username = user.username;
            users.mobileNumber = user.mobileNumber;
            users.userRole = user.userRole;
            entities.SaveChanges();

            var message = Request.CreateResponse(HttpStatusCode.OK, users);
            message.Headers.Location = new Uri(Request.RequestUri + " user edited successfully");

            return message;
        }

        [Route("user/deleteProfile")]
        [HttpDelete]
        public HttpResponseMessage deleteUser(string email)
        {
            var users = entities.Users.FirstOrDefault(us => us.email == email);
            if(users == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, " No user found with this email");
            }

            entities.Users.Remove(entities.Users.FirstOrDefault(x=>x.email == email));
            entities.SaveChanges();

            var message = Request.CreateResponse(HttpStatusCode.OK, users);
            message.Headers.Location = new Uri(Request.RequestUri,email);

            return message;
        }
        
    }
}
