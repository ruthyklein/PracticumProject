using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Repositories
{
    public interface IPositionRepository
    {
        Task<IEnumerable<Position>> GetPositionAsync();

        Task<Position> GetByIdAsync(int id);

        Task<Position> AddPositionAsync(Position positionp);

        Task<Position> UpdatePositionAsync(Position position);

        Task DeletePositionAsync(int id);
    }
}
