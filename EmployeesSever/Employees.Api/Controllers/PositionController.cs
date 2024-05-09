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

    public class PositionController : ControllerBase
    {

        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;
        public PositionController(IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var position = await _positionService.GetPositionAsync();
            return Ok(_mapper.Map<IEnumerable<PositionDto>>(position));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var position = await _positionService.GetByIdAsync(id);
            return Ok(_mapper.Map<PositionDto>(position));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PositionPostModel model)
        {
            var newPosition = await _positionService.AddPositionAsync(_mapper.Map<Position>(model));
            return Ok(_mapper.Map<PositionDto>(newPosition));
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PositionPostModel positionPostModel)
        {
            var newPosition = await _positionService.GetByIdAsync(id);
            if (newPosition is null)
            {
                return NotFound();
            }
            _mapper.Map(positionPostModel, newPosition);
            await _positionService.UpdatePositionAsync(newPosition);
            newPosition = await _positionService.GetByIdAsync(id);
            return Ok(_mapper.Map<PositionDto>(newPosition));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var position = await _positionService.GetByIdAsync(id);
            if (position is null)
            {
                return NotFound();
            }

            await _positionService.DeletePositionAsync(id);
            return NoContent();
        }
    }
}
