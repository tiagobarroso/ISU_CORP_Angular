using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ISU_CORP_Angular.Entities
{
    public class ReservationContext: DbContext
    {
        public ReservationContext(DbContextOptions<ReservationContext> option): base(option)
        {

        }

        public DbSet<Contact> contacts { get; set; }
        public DbSet<Reservation> reservations { get; set; }
        public DbSet<ContactType> contactTypes { get; set; }
    }
}
