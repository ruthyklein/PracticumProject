using Employees.Core.Entities;
using Employees.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Data.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public User GetByUserNameAndPassword(string userName, string password)
        {
            return _dataContext.UserList.FirstOrDefault(u => u.Name == userName && u.Password == password);
        }
    }
}
