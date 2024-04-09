using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Employees.Api.Models;
using Employees.Core.DTOs;
using Employees.Core.Entities;
using Employees.Core.Services;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace Employees.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService, IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _employeeService = employeeService;
            _mapper = mapper;
        }

        // GET: api/<AppointmentController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = await _employeeService.GetEmployeeAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }

        // GET api/<AppointmentController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee == null)
                return NotFound();

            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        // POST: api/<EmployeeController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeePostModel model)
        {
            // Validate ID number format
            if (!Regex.IsMatch(model.IdNumber, @"^\d{9}$"))
            {
                ModelState.AddModelError("IdNumber", "ID number must contain 9 digits");
                return BadRequest(ModelState);
            }

            // Check if an employee with the same ID number already exists in the system
            var allEmployees = await _employeeService.GetEmployeeAsync();
            if (allEmployees.Any(e => e.IdNumber == model.IdNumber))
            {
                ModelState.AddModelError("IdNumber", "An employee with the same ID number already exists in the system");
                return BadRequest(ModelState);
            }

            // Validate first name and last name
            if (!Regex.IsMatch(model.FirstName, @"^[\p{L}\s]{2,}$") || !Regex.IsMatch(model.LastName, @"^[\p{L}\s]{2,}$"))
            {
                ModelState.AddModelError("FirstName", "First name and last name must contain only letters and have a minimum length of 2");
                ModelState.AddModelError("LastName", "First name and last name must contain only letters and have a minimum length of 2");
                return BadRequest(ModelState);
            }

            // Validate age
            if ((DateTime.Today - model.DateOfBirth).TotalDays < 18 * 365)
            {
                ModelState.AddModelError("DateOfBirth", "Employee must be over 18 years old");
                return BadRequest(ModelState);
            }

            // Validate start of work date
            if (model.StartOfWorkDate < model.DateOfBirth)
            {
                ModelState.AddModelError("StartOfWorkDate", "Start of work date cannot be before date of birth");
                return BadRequest(ModelState);
            }

            // Validate entry date is after start of work date
            if (model.PositionList.Any(p => p.EntryDate < model.StartOfWorkDate))
            {
                ModelState.AddModelError("EntryDate", "Entry date must be after start of work date");
                return BadRequest(ModelState);
            }

            Employee employeeToAdd = _mapper.Map<Employee>(model);
            employeeToAdd.PositionList = new List<EmployeePosition>();
            foreach (EmployeePositionPostModel p in model.PositionList)
            {
                Position position = await _positionService.GetByIdAsync(p.PositionId);
                EmployeePosition employeePosition = _mapper.Map<EmployeePosition>(p);
                employeePosition.Position = position;
                employeeToAdd.PositionList.Add(employeePosition);
            }

            await _employeeService.AddEmployeeAsync(employeeToAdd);
            return CreatedAtAction(nameof(Get), new { id = employeeToAdd.Id }, _mapper.Map<EmployeeDto>(employeeToAdd));
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var employeeToUpdate = await _employeeService.GetByIdAsync(id);
            if (employeeToUpdate == null)
            {
                return NotFound();
            }

            // Validate ID number format
            if (!Regex.IsMatch(employee.IdNumber, @"^\d{9}$"))
            {
                ModelState.AddModelError("IdNumber", "ID number must contain 9 digits");
            }

            // Check if an employee with the same ID number already exists in the system
            var allEmployees = await _employeeService.GetEmployeeAsync();
            if (allEmployees.Any(e => e.IdNumber == employee.IdNumber && e.Id != id))
            {
                ModelState.AddModelError("IdNumber", "An employee with the same ID number already exists in the system");
            }

            // Validate firstName and lastName contain only letters and have minimum length of 2
            if (!Regex.IsMatch(employee.FirstName, @"^[\p{L}\s]{2,}$"))
            {
                ModelState.AddModelError("FirstName", "First name must contain only letters and have minimum length of 2");
            }

            if (!Regex.IsMatch(employee.LastName, @"^[\p{L}\s]{2,}$"))
            {
                ModelState.AddModelError("LastName", "Last name must contain only letters and have minimum length of 2");
            }

            // Validate age
            if ((DateTime.Today - employee.DateOfBirth).TotalDays < 18 * 365)
            {
                ModelState.AddModelError("DateOfBirth", "Employee must be over 18 years old");
            }

            // Validate startOfWorkDate is after dateOfBirth
            if (employee.StartOfWorkDate < employee.DateOfBirth)
            {
                ModelState.AddModelError("StartOfWorkDate", "Start of work date cannot be before date of birth");
            }

            // Validate entry date is after start of work date
            if (employee.PositionList.Any(p => p.EntryDate < employee.StartOfWorkDate))
            {
                ModelState.AddModelError("EntryDate", "Entry date must be after start of work date");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _mapper.Map(employee, employeeToUpdate);
            await _employeeService.UpdateEmployeeAsync(employeeToUpdate);
            var returnEmployee = await _employeeService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(returnEmployee));
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employeeToDelete = await _employeeService.GetByIdAsync(id);
            if (employeeToDelete == null)
                return NotFound();

            if (!employeeToDelete.IsActive)
                return BadRequest("Employee is no longer active");

            await _employeeService.DeleteEmployeeAsync(id);
            return NoContent();
        }
    }
}
