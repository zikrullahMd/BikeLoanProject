using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;


namespace BikeLoanProject.Controllers
{
    public class LoanController : ApiController
    {
        private static BikeLoanDBEntities entities = new BikeLoanDBEntities();


        [HttpPost]
        public HttpResponseMessage addLoan([FromBody] LoanApplication data)
        {
            entities.LoanApplications.Add(data);
            entities.SaveChanges();
            var message = Request.CreateResponse(HttpStatusCode.OK,data);
            message.Headers.Location = new Uri(Request.RequestUri + " " + data.loanId.ToString());

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
        public IEnumerable<LoanApplication> getAllLoans(LoanApplication data)
        {
                if(entities.LoanApplications.Count() == 0)
                {
                    return Enumerable.Empty<LoanApplication>();
                }
                var result = entities.LoanApplications.ToList();
                return result;
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
