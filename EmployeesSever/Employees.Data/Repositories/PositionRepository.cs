using Employees.Core.Entities;
using Employees.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Data.Repositories
{

        public class PositionRepository : IPositionRepository
        {
            private readonly DataContext _context;

            public PositionRepository(DataContext context)
            {
                _context = context;
            }

            public async Task<Position> AddPositionAsync(Position position)
            {
                _context.PositionList.Add(position);
                await _context.SaveChangesAsync();
                return position;
            }


            public async Task DeletePositionAsync(int id)
            {
                var position = await GetByIdAsync(id);
                _context.PositionList.Remove(position);
                await _context.SaveChangesAsync();
             }

            public async Task<Position> GetByIdAsync(int id)
            {
                return await _context.PositionList.FindAsync(id);
            }

            public async Task<IEnumerable<Position>> GetPositionAsync()
            {
                 return await _context.PositionList.ToListAsync();
            }

            public async Task<Position> UpdatePositionAsync(Position position)
            {
             var updatePosition = await GetByIdAsync(position.Id);
             _context.Entry(updatePosition).CurrentValues.SetValues(position);
               await _context.SaveChangesAsync();
              return position;
              }

        }
    
}
