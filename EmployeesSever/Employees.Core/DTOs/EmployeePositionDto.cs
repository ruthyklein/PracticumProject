using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.DTOs
{
    public class EmployeePositionDto
    {
        
        public PositionDto Position { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsAdministrative { get; set; }

    }
}
