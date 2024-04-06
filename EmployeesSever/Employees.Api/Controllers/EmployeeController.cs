using AutoMapper;
using Employees.Api.Models;
using Employees.Core.DTOs;
using Employees.Core.Entities;
using Employees.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Employees.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class EmployeeController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService,IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _employeeService = employeeService;
            _mapper = mapper;
        }

        // GET: api/<AppointmentController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employee = await _employeeService.GetEmployeeAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employee));
        }


        // GET api/<AppointmentController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
                return NotFound();
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        // POST <EmployeeController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeePostModel model)
        {
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
            return Ok(_mapper.Map<EmployeeDto>(employeeToAdd));
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,[FromBody] EmployeePostModel employee)
        {
            var employeeToUpdate = await _employeeService.GetByIdAsync(id);
            if (employeeToUpdate is null)
            {
                return NotFound();
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
            if (employeeToDelete.IsActive == false)
            {
                return NotFound("employee is no longer active");
            }
            await _employeeService.DeleteEmployeeAsync(id);
            return NoContent();
        }
    }
}
