
using Microsoft.AspNetCore.Authorization;

namespace Employees.Api.Models
{
    [Authorize]

    public class EmployeePostModel
    {
        public string IdNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime StartOfWorkDate { get; set; }
        public List<EmployeePositionPostModel> PositionList { get; set; }
    }
}
