using AutoMapper;
using Employees.Api.Models;
using Employees.Core.Entities;

public class PostModelsMappingProfile : Profile
{
    public PostModelsMappingProfile()
    {
       

        CreateMap<PositionPostModel, Position>();
        CreateMap<EmployeePositionPostModel, EmployeePosition>();
        CreateMap<EmployeePostModel, Employee>()
     .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => Enum.Parse<EGender>(src.Gender, true)));


    }
}
