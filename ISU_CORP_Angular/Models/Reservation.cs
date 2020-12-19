using ISU_CORP_Angular.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public List<Reservation> GetAllReservations(int page, int size, out int count)
        {
            var select = _context.reservations
                .Include(r => r.Contact);

            count = select.Count();

            var skip = (page - 1) * size;
            return select
                .Skip(skip)
                .Take(size)
                .ToList();
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
