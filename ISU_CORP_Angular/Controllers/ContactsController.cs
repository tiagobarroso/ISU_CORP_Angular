using ISU_CORP_Angular.Entities;
using ISU_CORP_Angular.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ISU_CORP_Angular.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController: ControllerBase
    {
        public ContactService _contactService;
        public ContactsController(ReservationContext context)
        {
            this._contactService = new ContactService(context);
        }

        [HttpGet("{id}")]
        public Contact Get(int id)
        {
            return this._contactService.GetContactById(id);
        }

        [HttpGet]
        public Object Get([FromQuery(Name = "search")] string search, [FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            return this._contactService.GetContacts(search, page, size);
        }

        [HttpPatch]
        public OkResult Patch([FromBody] Contact contact)
        {
            try
            {
                this._contactService.Save(contact);

                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpDelete("{id}")]
        public OkResult Delete(int id)
        {
            try
            {
                this._contactService.Delete(id);

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("contacttype/all")]
        public List<ContactType> GetAllContactTypes()
        {
            return this._contactService.GetAllContactType();
        }
    }
}
