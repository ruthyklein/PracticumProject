using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.DTOs
{
    public class PositionDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public DateTime EntryDate { get; set; }

        //public IEnumerable<EmployeePositionDto> EmployeePositionDtosList { get; set; }

    }
}
