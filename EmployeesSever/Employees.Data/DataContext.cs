using Employees.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics;

namespace Employees.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Position> PositionList { get; set; }
        public DbSet<Employee> EmployeeList { get; set; }
        public DbSet<User> UserList { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=Employees_db");
            optionsBuilder.LogTo((message) => Debug.Write(message));

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeePosition>().HasKey(em => new { em.EmployeeId, em.PositionId });

        }
    }
}
