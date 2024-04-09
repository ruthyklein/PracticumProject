# Employee Management System

## Project Overview

Welcome to the Employee Management System project! This web application is designed to facilitate efficient management of employee data within an organization. Built using Angular 17 for the frontend and .NET Core for the backend, the system follows a layered architecture approach with seamless database integration.

## Installation

1. Clone the repository from [GitHub](https://github.com/BatyaWail/PracticumProject).
2. Navigate to the project directory.

### Frontend

1. Navigate to the frontend directory (`/EmployeeClient`).
2. Run `npm install` to install dependencies.
3. Start the development server with `ng serve`.
4. Access the application at http://localhost:4200.

### Backend

1. Navigate to the backend directory (`/EmployeeServer`).
2. Open the solution file in Visual Studio.
3. Ensure all necessary NuGet packages are installed.
4. Open the "Package Manager Console."
5. Initialize the database by executing `add-migration init` followed by `update-database`.
6. Build and run the backend application.

## Project Structure

The project is structured as follows:

- **Frontend (Angular 17):** Implements user interface features for efficient employee management.
- **Backend (.NET Core):** Provides RESTful APIs to interact with the database and manage employee data effectively.

## Usage

The Employee Management System offers the following features:

1. **Employee List Page:** Displaying detailed information about employees and supporting CRUD operations.
2. **Employee Editing:** Allows users to modify employee details and assign roles dynamically.
3. **Employee Addition:** Facilitating the addition of new employees with role assignments.
4. **Search Functionality:** Filters employees based on entered text for ease of navigation.
5. **Export to Excel:** Allows exporting the employee list to an Excel file for further analysis.

## Authentication and Company Management

### Authentication

- Users are required to enter the company name and password to log in.
- Upon clicking the login button, the frontend sends an API request to the server.
- The server verifies the entered company name and password against the database records.
- If authentication is successful, the server issues a JWT token as a response for further authentication and identification.
- If authentication fails, the server returns an error message to the frontend.

### Company Management

- After successful authentication, the user is directed to a dashboard focused on the associated company.
- Only employees belonging to the user's company are displayed in the interface.
- There is a search filter for employees, allowing to display only those matching the entered text.
- Users can download a list of employees to an Excel file, including their data.
- There is a component for adding a new employee. When adding a new employee, users can dynamically assign roles.
- There is also a component for editing an employee, allowing users to edit employee details and roles.
- Users can log out of the system using the logout button.

## Notes

- All fields are mandatory with implemented input validation to ensure data integrity.
- Proper data validation and error handling are implemented to enhance user experience.
- Deleted employees are logically removed by changing their status to inactive, preserving historical data.

## Company Information

To access the system, use the following company credentials:

- **Company Name:** company1
- **Password:** 123456

Please make sure to use the provided company name and password for authentication. Without proper authentication, access to the system will be denied. 

Additionally, the system is filtered based on the company ID. Users can only view and manage employees associated with their respective company. 

## Conclusion

The Employee Management System provides a user-friendly interface for organizations to efficiently manage employee data. For further assistance or queries, refer to the project documentation or contact the development team.

Enjoy using the Employee Management System!
Ruthy klein 2024 r0583226266@gmail.com