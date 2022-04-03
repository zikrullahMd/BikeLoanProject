using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BikeLoanProjectNew.Models
{
    public class DocumentModel
    {
        public int documentid { get; set; }
        public string documentType { get; set; }
        public byte[] documentupload { get; set; }
    }
}