# Employee Management System

Welcome to the Employee Management System project! This project aims to provide a comprehensive solution for managing employees within an organization, including features for adding, editing, deleting, and searching employees, as well as managing their positions. The system is designed to present a combination of different learning materials in a practical project while emphasizing quality implementation, code integrity, and systemic thinking.

## Project Overview

The Employee Management System is designed to streamline employee management processes within organizations. It aims to solve the challenges of efficiently organizing and maintaining employee data, enhancing productivity, and ensuring data integrity. By adopting a layered architecture model, the project emphasizes better organization and maintainability, enabling seamless scaling and future enhancements.

## Project Structure

The project follows a layered architecture model for better organization and maintainability:

- **Frontend (Angular 17)**: Implements user interface features for efficient employee management.
- **Backend (.NET Core)**: Provides RESTful APIs to interact with the database and manage employee data effectively.

## Features

The Employee Management System offers the following features:
- **Employee Table Management**: View, add, edit, and delete employee records.
- **Position Management**: Dynamically add positions with details.
- **Search Functionality**: Filter employees based on search criteria.
- **Export to Excel**: Export employee list to Excel file for download.

## Technologies Used

- **Client-side**: Angular
- **Server-side**: .NET 
- **Database**: SQL
- **Cloud Platform**: Google Cloud Platform or AWS

## Getting Started

1. Clone the Repository, Run:
  ```
    https://github.com/ruthyklein/PracticumProject/edit/main/README.md
      ```
   &#x202b;
3. Navigate to the Project Directory.
### Backend

1. Access Backend Directory: `/EmployeesSever`.
2. Open Solution File: Launch in Visual Studio.
3. Install Necessary NuGet Packages.
4. Open Package Manager Console.
5. Initialize Database, Run the following command :
   ```
   `add-migration init`
   
   `update-database`
   ```
   &#x202b;
   
6. Build and Run the Backend Application.

### Frontend

1. Go to Frontend Directory: `/AngularEmploees`.
2. Install Dependencies, Run:
    ```
   `npm install`
    ```
   &#x202b;

3. Start the Development Server, Execute:
   ```
   `ng serve`
   ```
   &#x202b;
   
5. Run the application locally, Visit:
   ```
   http://localhost:4200
    ```
   &#x202b;
   

### Company Management

- Users are directed to a dashboard focused on the associated company.
- Only employees belonging to the user's company are displayed.
- A search filter enables displaying employees matching the entered text.
- Users can download a list of employees to an Excel file, including their data.
- Components for adding and editing employees allow dynamic position assignment.

## Notes
- All fields are mandatory with implemented input validation for data integrity.
- Proper data validation and error handling enhance user experience.
- Deleted employees are logically removed, preserving historical data by changing their status to inactive.

# Deployment

Deploy the application 
- Components to a public Git repository, with the server-side deployed to Google Cloud Platform or AWS. Set up CI/CD processes 

## Screenshots

![Home Page](/AngularEmploees/src/assets/home_page.png)

## Contributing

Contributions to the project are welcome! Please follow the established coding standards and guidelines. Fork the repository, make your changes, and submit a pull request.

## Credits

This project was created by Ruth Klein as part of a screening practicum. We would like to acknowledge the valuable contributions of all those involved in its development.

## Contact:
For more help or questions, see the project documentation or contact the development team at r0583226266@gmail.com Enjoy using the employee management system!
