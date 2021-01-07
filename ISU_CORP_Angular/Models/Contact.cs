using ISU_CORP_Angular.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
                .FirstOrDefault();
        }

        public Object GetContacts(string search, int page, int size, string sort)
        {
            var select = this._context.contacts
                .Where(c => (search != null && c.Name.Contains(search)) || (search == null));

            dealSort(sort, ref select);

            var count = select.Count();

            var skip = (page - 1) * size;
            var list = select
                .Include(c => c.ContactType)
                .Skip(skip)
                .Take(size)
                .ToList();

            return new { list, count };
        }

        private static void dealSort(string sort, ref IQueryable<Contact> select)
        {
            if (sort == null)
            {
                return;
            }

            var sortTerm = sort.Trim('-');
            bool asc = !sort.Contains('-');

            Expression<Func<Contact, dynamic>> exp = null;

            switch (sortTerm)
            {
                case "contactName":
                    exp = s => s.Name;
                    break;
                case "contactType":
                    exp = s => s.ContactType.Name;
                    break;
                case "contactPhone":
                    exp = s => s.Phone;
                    break;
                case "contactBirth":
                    exp = s => s.Birth;
                    break;
                default:
                    return;
            }

            if (asc)
            {
                select = select.OrderBy(exp);
            }
            else
            {
                select = select.OrderByDescending(exp);
            }
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
