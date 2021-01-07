using ISU_CORP_Angular.Entities;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ISU_CORP_Angular.Models
{   
    public class ReservationService
    {
        private readonly ReservationContext _context;

        public ReservationService(ReservationContext context)
        {
            _context = context;
        }        

        public List<Reservation> GetAllReservations(int page, int size, string sort, out int count)
        {
            var select = _context.reservations.AsQueryable();

            dealSort(sort, ref select);
                
            count = select.Count();
            
            var skip = (page - 1) * size;
            return select
                .Include(r => r.Contact)
                .Skip(skip)
                .Take(size)
                .ToList();
        }

        private static void dealSort(string sort, ref IQueryable<Reservation> select)
        {
            if(sort == null)
            {
                return;
            }

            var sortTerm = sort.Trim('-');
            bool asc = !sort.Contains('-');

            Expression<Func<Reservation, dynamic>> exp = null;

            switch (sortTerm)
            {
                case "contactName":
                    exp = s => s.Contact.Name;
                    break;
                case "date":
                    exp = s => s.Date;
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

        public async Task<Reservation> GetAllReservationById(int id)
        {
            return await _context.reservations
                .Where(r => r.ReservationId == id)
                .Include(r => r.Contact)
                .FirstOrDefaultAsync();
        }

        public async Task<Object> Save(Reservation reservation)
        {
            try
            {
                if (reservation.Contact != null)
                {
                    _context.contacts.Add(reservation.Contact);
                }

                _context.reservations.Update(reservation);

                return await _context.SaveChangesAsync();
            }catch(Exception e)
            {
                return e;
            }
            
        }

    }

    
}
