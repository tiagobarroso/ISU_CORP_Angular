using ISU_CORP_Angular.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ISU_CORP_Angular.Models
{
    public class ContactService
    {
        private readonly ReservationContext _context;

        public ContactService(ReservationContext context)
        {
            _context = context;
        }

        public Contact GetContactById(int id)
        {
            return this._context.contacts
                .Include(c => c.ContactType)
                .Where(c => c.ContactId == id)
                .First();
        }

        public Object GetContacts(string search, int page, int size)
        {
            var select = this._context.contacts
                .Include(c => c.ContactType)
                .Where(c => (search != null && c.Name.Contains(search)) || (search == null));

            var count = select.Count();

            var skip = (page - 1) * size;
            var list = select.Skip(skip).Take(size).ToList();

            return new { list, count };
        }

        public void Save(Contact contact)
        {
            try
            {
                _context.contacts.Update(contact);

                _context.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Delete(int id)
        {
            try
            {
                _context.contacts.Remove(_context.contacts.Where(c => c.ContactId == id).First());

                _context.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ContactType> GetAllContactType()
        {
            return this._context.contactTypes.ToList();
        }
    }
}
