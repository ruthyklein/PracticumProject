using Employees.Core.Entities;
using Employees.Core.Repositories;
using Employees.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Service.Services
{
    public class UserService:IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User GetByUserNameAndPassword(string userName, string password)
        {
            return _userRepository.GetByUserNameAndPassword(userName, password);
        }
    }
}
