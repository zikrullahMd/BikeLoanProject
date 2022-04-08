using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;


namespace BikeLoanProjectNew.Controllers
{
    
    public class LoanController : ApiController
    {
        private static BikeLoanDBEntities entities = new BikeLoanDBEntities();

        [Route("admin/addLoan")]
        [HttpPost]
        public HttpResponseMessage addLoan([FromBody] LoanApplication data)
        {
            LoanApplication toadd = new LoanApplication()
            {
                loantype = data.loantype,
                applicantName = data.applicantName,
                applicantAddress = data.applicantAddress,
                applicantMobile = data.applicantMobile,
                applicantEmail = data.applicantEmail,
                applicantAadhar = data.applicantAadhar,
                applicantPan = data.applicantPan,
                applicantSalary = data.applicantSalary,
                loanAmount = data.loanAmount,
                loanRepaymentMonths = data.loanRepaymentMonths,
                status = data.status,
            };
            System.Diagnostics.Debug.WriteLine(data.loanId);
            entities.LoanApplications.Add(toadd);
            try
            {
                entities.SaveChanges(); 
                var message = Request.CreateResponse(HttpStatusCode.OK, toadd.loanId);
                message.Headers.Location = new Uri(Request.RequestUri + " " + "loan added");
                return message;
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
            
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "no possible");
        }

        [Route("admin/editLoan")]
        [HttpPut]
        public HttpResponseMessage editLoan(int loanId, [FromBody] LoanApplication data)
        {
            try
            {
                LoanApplication loan = entities.LoanApplications.FirstOrDefault(l => l.loanId == loanId);
                if (loan == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "No data found");
                }
                loan.loantype = data.loantype;
                loan.applicantName = data.applicantName;
                loan.applicantAddress = data.applicantAddress;
                loan.applicantMobile = data.applicantMobile;
                loan.applicantEmail = data.applicantEmail;
                loan.applicantAadhar = data.applicantAadhar;
                loan.applicantPan = data.applicantPan;
                loan.applicantSalary = data.applicantSalary;
                loan.loanAmount = data.loanAmount;
                loan.loanRepaymentMonths = data.loanRepaymentMonths;
                loan.status = data.status;
                entities.SaveChanges();
                var message = Request.CreateResponse(HttpStatusCode.OK, loan);
                message.Headers.Location = new Uri(Request.RequestUri + " " + loanId);
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("admin/updateStatus")]
        [HttpPut]
        public HttpResponseMessage updateStatus(int loanId, String Status)
        {
            try
            {
                LoanApplication application = entities.LoanApplications.FirstOrDefault(l => l.loanId == loanId);
                application.status = Status;
                entities.SaveChanges();
                var message = Request.CreateResponse(HttpStatusCode.OK, application);
                message.Headers.Location = new Uri(Request.RequestUri + Status);
                return message;
            }catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        [Route("admin/getByStatus")]
        [HttpGet]
        public HttpResponseMessage getByStatus(string status)
        {
            try
            {
                List<LoanApplication> application = entities.LoanApplications.Where(e => e.status.Equals(status)).ToList();
                var message = Request.CreateResponse(HttpStatusCode.OK, application);
                message.Headers.Location = new Uri(Request.RequestUri + status);
                return message;
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }

        [Route("admin/getAllLoans")]
        [HttpGet]
        public HttpResponseMessage getAllLoans()
        {
            if (entities.LoanApplications.Count() == 0)
            {
                
                var errormsg = Request.CreateResponse(HttpStatusCode.NotFound, Enumerable.Empty<LoanApplication>().ToList());
                errormsg.Headers.Location = new Uri(Request.RequestUri + " " + " no user found ");
                return errormsg;
            }
           

            var message = Request.CreateResponse(HttpStatusCode.OK, entities.LoanApplications.ToList());
            message.Headers.Location = new Uri(Request.RequestUri + " " + "Success");
            return message;
        }

        [Route("admin/deleteLoan")]
        [HttpDelete]
        public HttpResponseMessage deleteLoan(int loanId)
        {
            try
            {
                entities.LoanApplications.Remove(entities.LoanApplications.FirstOrDefault(l => l.loanId == loanId));
                entities.SaveChanges();
                var message = Request.CreateResponse(HttpStatusCode.OK, "Delete success");
                message.Headers.Location = new Uri(Request.RequestUri + " " + loanId);
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }


        [Route("user/viewLoan")]
        [HttpGet]
        public HttpResponseMessage viewLoan(int loanId)
        {
            LoanApplication application = entities.LoanApplications.FirstOrDefault(l => l.loanId == loanId);
            if (application == null)
            {
                var msg = Request.CreateResponse(HttpStatusCode.NotFound, "No Loan Found");
                return msg;
            }

            var message = Request.CreateResponse(HttpStatusCode.OK, application);
            message.Headers.Location = new Uri(Request.RequestUri + "okay");
            return message;
        }
    }
}
