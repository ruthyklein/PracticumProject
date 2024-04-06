﻿using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Services
{
    public interface IPositionService
    {
        Task<IEnumerable<Position>> GetPositionAsync();

        Task<Position> GetByIdAsync(int id);

        Task<Position> AddPositionAsync(Position position);

        Task<Position> UpdatePositionAsync(Position position);

        Task DeletePositionAsync(int id);
    }
}