namespace Employees.Api.Middlewares
{
    using System;
    using System.Threading.Tasks;
    using Employees.Api.Models;
    using Microsoft.AspNetCore.Http;

    public class ValidationMiddleware
    {
        private readonly RequestDelegate _next;

        public ValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
       
            // Perform validation checks here
            //if (context.Request.Path.StartsWithSegments("/api/employee") && context.Request.Method == "POST")
            //{
                var employeePostModel = await context.Request.ReadFromJsonAsync<EmployeePostModel>();
                
                //if (employeePostModel == null)
                //{
                //    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                //    await context.Response.WriteAsync("Invalid request body");
                //    return;
                //}

                if (employeePostModel.IdNumber.Length != 9)
                {
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsync("ID number must be 9 characters long");
                    return;
                }
                else
            {
                await _next(context);
            }


            //if (employeePostModel.StartOfWorkDate <= employeePostModel.DateOfBirth)
            //{
            //    context.Response.StatusCode = StatusCodes.Status400BadRequest;
            //    await context.Response.WriteAsync("Start of work date must be after date of birth");
            //    return;
            //}

            //if (employeePostModel.StartOfWorkDate > DateTime.Now || employeePostModel.DateOfBirth > DateTime.Now)
            //{
            //    context.Response.StatusCode = StatusCodes.Status400BadRequest;
            //    await context.Response.WriteAsync("Dates cannot be in the future");
            //    return;
            //}
            /////  }

            
        }
    }

}
