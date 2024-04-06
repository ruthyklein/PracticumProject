
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






        //[Required(ErrorMessage = "IdNumber is required")]
        //public string IdNumber { get; set; }

        //[Required(ErrorMessage = "FirstName is required")]
        //public string FirstName { get; set; }

        //[Required(ErrorMessage = "LastName is required")]
        //public string LastName { get; set; }

        //[Required(ErrorMessage = "Gender is required")]
        //public Gender Gender { get; set; }

        //[Required(ErrorMessage = "DateOfBirth is required")]
        //public DateTime DateOfBirth { get; set; }

        //[Required(ErrorMessage = "StartOfWorkDate is required")]
        //public DateTime StartOfWorkDate { get; set; }

    }
}
