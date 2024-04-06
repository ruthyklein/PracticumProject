using Employees.Core.Entities;

namespace Employees.Core.Repositories
{
    public interface IUserRepository
    {
        public User GetByUserNameAndPassword(string Name, string password);

    }
}
