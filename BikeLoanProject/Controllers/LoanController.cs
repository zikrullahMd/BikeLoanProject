using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;
using BikeLoanProject.Models;
using WebApp.Models;
using System.Web.Http.Cors;

namespace BikeLoanProject.Controllers
{
    [EnableCors("*", "*", "*")]
    public class LoanController : ApiController
    {
        private static BikeLoanDBEntities entities = new BikeLoanDBEntities();

        [Route("admin/addLoan")]
        [HttpPost]
        public HttpResponseMessage addLoan([FromBody] LoanApplication data)
        {
            LoanApplication toadd = new LoanApplication()
            {
                loanId = data.loanId,
                loantype = data.loantype,
                applicantName = data.applicantName,
                applicantAddress = data.applicantAddress,
                applicantMobile = data.applicantMobile,
                applicantEmail = data.applicantEmail,
                applicantAadhar = data.applicantAadhar,
                applicantPan = data.applicantPan,
                applicantSalary = data.applicantSalary,
                loanAmount = data.loanAmount,
                loanRepaymentMongths = data.loanRepaymentMongths
            };
            entities.LoanApplications.Add(toadd);
            entities.SaveChanges();
            var message = Request.CreateResponse(HttpStatusCode.OK,toadd);
            message.Headers.Location = new Uri(Request.RequestUri + " " + "loan added");

            return message;
        }

        [Route("admin/editLoan")]
        [HttpPut]
        public HttpResponseMessage editLoan(int loanId, [FromBody] LoanApplication data)
        {
            try
            {
                LoanApplication loan = entities.LoanApplications.FirstOrDefault(l => l.loanId == loanId);
                if(loan == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound,"No data found");
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
                loan.loanRepaymentMongths = data.loanRepaymentMongths;
                entities.SaveChanges();
                var message = Request.CreateResponse(HttpStatusCode.OK,loan);
                message.Headers.Location = new Uri(Request.RequestUri + " " + loanId);
                return message;
            }catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,ex);
            }
        }


        [Route("admin/getAllLoans")]
        [HttpGet]
        public HttpResponseMessage getAllLoans()
        {
                if(entities.LoanApplications.Count() == 0)
                {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No user found");
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
                entities.LoanApplications.Remove(entities.LoanApplications.FirstOrDefault(l=>l.loanId == loanId));
                entities.SaveChanges();
                var message = Request.CreateResponse(HttpStatusCode.OK,"Delete success");
                message.Headers.Location = new Uri(Request.RequestUri+" "+loanId);
                return message;
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest,ex);
            }
        }
    }
}
