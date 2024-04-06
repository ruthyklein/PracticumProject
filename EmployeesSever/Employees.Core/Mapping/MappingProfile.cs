using AutoMapper;
using Employees.Core.DTOs;
using Employees.Core.Entities;

namespace Employees.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PositionDto, Position>().ReverseMap();

            CreateMap<Employee, EmployeeDto>()
            .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender.ToString())).ReverseMap(); ;

            CreateMap<EmployeePositionDto, EmployeePosition>().ReverseMap();
          
        }
    }
}
