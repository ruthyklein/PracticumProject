using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Services
{
    public interface IUserService
    {
        public User GetByUserNameAndPassword(string userName, string password);

    }
}
