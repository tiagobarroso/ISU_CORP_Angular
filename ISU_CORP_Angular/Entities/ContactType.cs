using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ISU_CORP_Angular.Entities
{
    public class ContactType
    {
        [Key]
        public int ContactTypeId { get; set; }

        public string Name { get; set; }
    }
}
