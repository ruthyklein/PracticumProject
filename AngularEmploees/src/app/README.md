# Employee Management System

Welcome to the Employee Management System project! This project aims to provide a comprehensive solution for managing employees within an organization, including features for adding, editing, deleting, and searching employees, as well as managing their roles. The system consists of both a client-side application built with Angular and a server-side application built with .NET .

## Project Overview

The Employee Management System is designed to showcase the integration of various learning materials into a practical project, emphasizing quality implementation, code correctness, and systems thinking. By completing this project, you'll not only demonstrate your technical skills but also your ability to combine knowledge from different subjects into a cohesive application.

## Project Structure

The project follows a layered architecture model for better organization and maintainability:

- **Frontend (Angular 17)**: Implements user interface features for efficient employee management.
- **Backend (.NET Core)**: Provides RESTful APIs to interact with the database and manage employee data effectively.

## Features

- **Employee List Management**: View, add, edit, and delete employee records.
- **Role Management**: Dynamically add roles with details such as position name, type, and start date.
- **Search Functionality**: Filter employees based on search criteria.
- **Export to Excel**: Export employee list to Excel file for download.

## Technologies Used

- **Client-side**: React (or Angular)
- **Server-side**: .NET 6
- **Database**: SQL
- **Cloud Platform**: Google Cloud Platform or AWS

## Usage

The Employee Management System offers the following features:

- **Employee Management**:
  - View, add, edit, and delete employee records.
  - Dynamically assign positions to employees.
  - Logical deletion of employees by changing their status to inactive.
- **Export to Excel**: Allows exporting the employee list to an Excel file for further analysis.

## Getting Started

1. **Clone the Repository**: [GitHub](https://github.com/ruthyklein/PracticumProject).
2. **Navigate to the Project Directory**.

### Frontend

1. **Go to Frontend Directory**: `/AngularEmploees`.
2. **Install Dependencies**: Run `npm install`.
3. **Start the Development Server**: Execute `ng serve`.
4. **Run the application locally**: Visit http://localhost:4200.

### Backend

1. **Access Backend Directory**: `/EmployeesSever`.
2. **Open Solution File**: Launch in Visual Studio.
3. **Install Necessary NuGet Packages**.
4. **Open Package Manager Console**.
5. **Initialize Database**: Execute `add-migration init` and `update-database`.
6. **Build and Run the Backend Application**.

### Company Management

- Users are directed to a dashboard focused on the associated company.
- Only employees belonging to the user's company are displayed.
- A search filter enables displaying employees matching the entered text.
- Users can download a list of employees to an Excel file, including their data.
- Components for adding and editing employees allow dynamic role assignment.

## Notes

[!NOTE]
All fields are mandatory with implemented input validation for data integrity.

- Proper data validation and error handling enhance user experience.
- Deleted employees are logically removed, preserving historical data by changing their status to inactive.

## Deployment

Deploy the application to a public Git repository, with the server-side deployed to Google Cloud Platform or AWS. Set up CI/CD processes to automatically detect codebase changes and deploy updates to the cloud environment.

## Screenshots

![Home Page](src/assets/home_page.png)

## Contributing

Contributions to the project are welcome! Please follow the established coding standards and guidelines. Fork the repository, make your changes, and submit a pull request.

## Credits

This project was created as part of a screening practicum. Credits to the contributors involved in its development.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for considering the Employee Management System project. We hope it serves as a valuable learning experience and a demonstration of your skills in software development. Good luck!

Ruth Klein 2024
r0583226266@gmail.com
