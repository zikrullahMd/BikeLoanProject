using System;

namespace WebApp.Models{
    public class LoanApplicationModel{
        public int loanId {get;set;}
        public string loantype {get;set;}
        public string applicantName {get;set;}
        public string applicantAddress{get;set;}
        public string applicantMobile {get;set;}
        public string applicantEmail {get;set;}
        public string applicantAadhar {get;set;}
        public string applicantPan {get;set;}
        public string applicantSalary {get;set;}
        public string loanAmount {get;set;}
        public string loanRepaymentMonths {get;set;}
    }
}