using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Entities
{
    public class EmployeePosition
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        //public Employee Employee { get; set; }
        public Position Position { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsAdministrative { get; set; }

    }
}
