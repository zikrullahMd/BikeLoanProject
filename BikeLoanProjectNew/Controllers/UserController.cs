using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using DataAccess;
using Newtonsoft.Json;

namespace BikeLoanProjectNew.Controllers
{

    public class UserController : ApiController
    {
        private static BikeLoanDBEntities entities = new BikeLoanDBEntities();

        [Route("user/signup")]
        [HttpPost]
        public HttpResponseMessage signup([FromBody] User user)
        {
            try
            {
                entities.Users.Add(user);
                entities.SaveChanges();
                var message = Request.CreateResponse(HttpStatusCode.OK, "user added");
                message.Headers.Location = new Uri(Request.RequestUri + " " + user.email);
                return message;
            }
            catch (DbEntityValidationException ex)
            {
                Console.WriteLine(ex);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }


        [Route("user/login")]
        [HttpPost]
        public HttpResponseMessage login([FromBody] Login login)
        {
            AuthController auth = new AuthController();
            System.Diagnostics.Debug.WriteLine(login.email);
            System.Diagnostics.Debug.WriteLine(login.password);

            if (auth.isUserPresent(login))
            {
                var message = Request.CreateResponse(HttpStatusCode.OK, "User");
                var user = entities.Users.FirstOrDefault(us => us.email == login.email);
                var admin = entities.Admins.FirstOrDefault(ad => ad.email == login.email);
                if (user != null)
                {
                    message.Headers.Location = new Uri(Request.RequestUri + "Valid user");
                }
                return message;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid user");
            }
        }


        [Route("user/getProfile")]
        [HttpGet]
        public HttpResponseMessage getUser(string email)
        {
            var user = entities.Users.FirstOrDefault(us => us.email == email);
            var loanDet = entities.LoanApplications.FirstOrDefault(us => us.applicantEmail == email);
            if (user == null && loanDet == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            BikeLoanProjectNew.Models.Profiles res = new BikeLoanProjectNew.Models.Profiles();
            if (loanDet == null)
            {

                res.username = user.username;
                res.address = "nil";
                res.mobile = user.mobileNumber;
                res.loanid = -1;
                res.email = user.email;
                res.emi = -1;
            }
            else
            {
                var calemi = Convert.ToInt32(loanDet.loanAmount) / Convert.ToInt32(loanDet.loanRepaymentMonths);
                res.username = user.username;
                res.address = loanDet.applicantAddress;
                res.mobile = user.mobileNumber;
                res.loanid = loanDet.loanId;
                res.email = user.email;
                res.emi = calemi;
            }
            var message = Request.CreateResponse(HttpStatusCode.OK, JsonConvert.SerializeObject(res));
            message.Headers.Location = new Uri(Request.RequestUri + " " + "User found");

            return message;
        }

        [HttpGet]
        public IEnumerable<User> getUsers()
        {
            var users = entities.Users.ToList();
            if (users.Count == 0)
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
            if (users == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "No user found with this email");
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
            if (users == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, " No user found with this email");
            }

            entities.Users.Remove(entities.Users.FirstOrDefault(x => x.email == email));
            entities.SaveChanges();

            var message = Request.CreateResponse(HttpStatusCode.OK, users);
            message.Headers.Location = new Uri(Request.RequestUri, email);

            return message;
        }


        [Route("user/addDocument")]
        [HttpPost]
        public HttpResponseMessage addDocument([FromBody] Document doc)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (HttpContext.Current.Request.Files.Count == 0)
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];
            NameValueCollection nvc = HttpContext.Current.Request.Form;
            string type = nvc["documentType"];
            System.Diagnostics.Debug.WriteLine(nvc["documentType"]);

            //Convert the File data to Byte Array.
            byte[] bytes;
            using (BinaryReader br = new BinaryReader(postedFile.InputStream))
            {
                bytes = br.ReadBytes(postedFile.ContentLength);
            }

            Document document = new Document
            {
                documentType = type,
                documentupload = bytes
            };
            entities.Documents.Add(document);
            entities.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, new { Name = document.documentType, type=document.GetType() });
        }


        [HttpGet]
        [Route("user/downloadDocument")]
        public HttpResponseMessage GetFile(int fileId)
        {
            //Create HTTP Response.
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            //Fetch the File data from Database.

            Document file = entities.Documents.ToList().Find(p => p.documentid == fileId);

            //Set the Response Content.
            response.Content = new ByteArrayContent(file.documentupload);

            //Set the Response Content Length.
            response.Content.Headers.ContentLength = file.documentupload.LongLength;

            //Set the Content Disposition Header Value and FileName.
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = file.documentType;

            //Set the File Content Type.
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("multipart/form-data");
            return response;
        }
    }
}


