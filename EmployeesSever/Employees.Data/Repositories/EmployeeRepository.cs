using Employees.Core.Entities;
using Employees.Core.Repositories;
using Employees.Core.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employees.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        private readonly IPositionService _positionService;

        public EmployeeRepository(DataContext context, IPositionService positionService)
        {
            _context = context;
            _positionService = positionService;
        }

        public async Task<IEnumerable<Employee>> GetEmployeeAsync()
        {
            return await _context.EmployeeList.Where(e=>e.IsActive)
                .Include(e => e.PositionList)
                .ThenInclude(em => em.Position).ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.EmployeeList.Include(e => e.PositionList)
                .ThenInclude(ep => ep.Position)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            _context.EmployeeList.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            var updatedEmployee = await GetByIdAsync(employee.Id);
            _context.Entry(updatedEmployee).CurrentValues.SetValues(employee);
            foreach (var newPosition in employee.PositionList)
            {
                var existingPosition = updatedEmployee.PositionList.FirstOrDefault(p => p.PositionId == newPosition.PositionId);
                if (existingPosition != null)
                {
                    _context.Entry(existingPosition).CurrentValues.SetValues(newPosition);
                }
                else
                {
                    var position = await _positionService.GetByIdAsync(newPosition.PositionId);
                    updatedEmployee.PositionList.Add(new EmployeePosition
                    {
                        PositionId = newPosition.PositionId,
                        IsAdministrative = newPosition.IsAdministrative,
                        EntryDate = newPosition.EntryDate,
                    });
                }
            }
            await _context.SaveChangesAsync();
            return updatedEmployee;
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            var employee = await GetByIdAsync(id);
            employee.IsActive = false;
            await _context.SaveChangesAsync();

        }
    }
}

