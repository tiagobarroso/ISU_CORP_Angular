using ISU_CORP_Angular.Entities;
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
        public ReservationContext _context;
        public ContactsController(ReservationContext context)
        {
            this._context = context;
        }

        [HttpGet("{id}")]
        public Task<Contact> Get(int id)
        {
            return this._context.contacts
                .Include(c => c.ContactType)
                .Where(c => c.ContactId == id)
                .FirstAsync();
        }

        [HttpGet]
        public Object Get([FromQuery(Name = "search")] string search, [FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            var select = this._context.contacts
                .Include(c => c.ContactType)
                .Where(c => (search != null && c.Name.Contains(search)) || (search == null));

            var count = select.Count();

            var skip = (page - 1) * size;
            var list = select.Skip(skip).Take(size).ToList();

            return new { list , count};
        }

        [HttpPatch]
        public OkResult Patch([FromBody] Contact contact)
        {
            try
            {
                _context.contacts.Update(contact);

                _context.SaveChanges();

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
                _context.contacts.Remove(_context.contacts.Where(c => c.ContactId == id).First());

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("contacttype/all")]
        public Task<List<ContactType>> GetAllContactTypes()
        {
            return this._context.contactTypes.ToListAsync();
        }
    }
}
