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
    public class PositionService : IPositionService
    {
        private readonly IPositionRepository _positionRepository;

        public PositionService(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

        public async Task<Position> AddPositionAsync(Position position)
        {
            return await _positionRepository.AddPositionAsync(position);
        }

        public async Task DeletePositionAsync(int id) 
        {
            await _positionRepository.DeletePositionAsync(id);
        }

        public async Task<IEnumerable<Position>> GetPositionAsync()
        {
            return await _positionRepository.GetPositionAsync();
        }

        public async Task<Position> GetByIdAsync(int id)
        {
            return await _positionRepository.GetByIdAsync(id);
        }

        public async Task<Position> UpdatePositionAsync(Position position)
        {
            return await _positionRepository.UpdatePositionAsync(position);
        }
    }
}
