using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BikeLoanProjectNew.Models
{
    public class AdminModel
    {
        public string email { get; set; }
        public string password { get; set; }
        public string mobileNumber { get; set; }
        public string userRole { get; set; }
    }
}