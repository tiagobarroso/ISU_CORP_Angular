using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ISU_CORP_Angular.Entities
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }
                
        public DateTime CreatedAt { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        [Required]
        [ForeignKey("Contact")]
        public int ContactId { get; set; }
        public Contact Contact { get; set; }
    }
}
