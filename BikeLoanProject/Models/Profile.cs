using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BikeLoanProject.Models
{
    public class Profile
    {
        public string username { get; set; }    
        public string address { get; set; } 
        public string mobile { get; set; }  
        public int loanid { get; set; }
        public string email { get; set; }
        public int emi { get; set; }
    }
}