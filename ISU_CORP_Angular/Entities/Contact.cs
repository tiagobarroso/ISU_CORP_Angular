using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISU_CORP_Angular.Entities
{
    public class Contact
    {
        [Key]
        public int ContactId { get; set; }

        public string Name { get; set; }

        public DateTime Birth { get; set; }

        public string Phone { get; set; }

        [Required]
        public int ContactTypeId { get; set; }

        public ContactType ContactType { get; set; }

        public List<Reservation> Reservations { get; set; }
    }
}
