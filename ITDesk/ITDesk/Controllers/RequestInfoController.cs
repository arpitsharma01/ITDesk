using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITDesk.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace ITDesk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestInfoController : ControllerBase
    {
        ITDeskContext _context;
        private IConfiguration _config;

        public RequestInfoController(IConfiguration config, ITDeskContext context)
        {
            _config = config;
            _context = context;
        }
        // GET: api/RequestInfo
        [HttpGet]
        [Route("[action]")]
        // GET: api/requestInfo/requestStatus?status=false
        public ActionResult requestStatus(bool status)
        {
            if (status == false)
            {
                var query = (from R in _context.RequestInfo
                             where R.Status == false
                             select new
                             {
                                 R.Id,
                                 R.EmployeeEmail,
                                 R.DeviceName,
                             }).ToList();
                return Ok(query);
            }
            else
            {
                var query = (from R in _context.RequestInfo
                             where R.Status == true
                             select new
                             {
                                 R.Id,
                                 R.EmployeeEmail,
                                 R.DeviceName,
                             }).ToList();
                return Ok(query);
            }
        }
        // POST: api/RequestInfo/request
        [HttpPost]
        [Route("[action]")]
        public ActionResult request([FromBody] RequestInfo newrequest)
        {
            RequestInfo requestInfo = new RequestInfo();
            requestInfo.EmployeeEmail = newrequest.EmployeeEmail;
            requestInfo.DeviceName = newrequest.DeviceName;
            _context.RequestInfo.Add(requestInfo);
            _context.SaveChanges();
            return Ok(requestInfo);
        }

        // PUT: api/RequestInfo/updateStatus/5
        [HttpPut("{id}")]
        [Route("[action]/{id}")]
        public ActionResult updateStatus(int id, [FromBody] RequestInfo request)
        {
            RequestInfo requestInfo = _context.RequestInfo.FirstOrDefault(d => d.Id == id);
            requestInfo.Status = request.Status;
            _context.RequestInfo.Update(requestInfo);
            _context.SaveChanges();
            return Ok(requestInfo);
        }
    }
}