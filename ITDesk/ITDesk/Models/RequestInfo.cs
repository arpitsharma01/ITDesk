using System;
using System.Collections.Generic;

namespace ITDesk.Models
{
    public partial class RequestInfo
    {
        public int Id { get; set; }
        public string EmployeeEmail { get; set; }
        public string DeviceName { get; set; }
        public bool Status { get; set; }
    }
}
