

namespace Employees.Api.Models
{

    public class EmployeePositionPostModel
    {
        public int PositionId { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsAdministrative { get; set; }

    }
}
