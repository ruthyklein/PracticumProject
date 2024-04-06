// import { Injectable } from '@angular/core';
// import { Employee } from '../models/employee.model';
// const { google } = require('googleapis');

// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleSheetsService {

//   constructor() { }

//   exportToGoogleSheets(employees: Employee[]) {
//     const flattenedData = employees.flatMap(employee => {
//       return employee.positionList.map(positionData => ({
//         ID: employee.id,
//         IDNumber: employee.idNumber,
//         FirstName: employee.firstName,
//         LastName: employee.lastName,
//         Gender: employee.gender,
//         DateOfBirth: employee.dateOfBirth,
//         StartOfWorkDate: employee.startOfWorkDate,
//         PositionName: positionData.position.name,
//         EntryDate: positionData.entryDate,
//         IsAdministrative: positionData.isAdministrative
//       }));
//     });
  
//     const updatedFlattenedData = [];
//     flattenedData.forEach(item => {
//       const positions = item.PositionName.split(',');
//       if (positions.length > 1) {
//         positions.forEach(position => {
//           updatedFlattenedData.push({
//             ...item,
//             PositionName: position.trim()
//           });
//         });
//       } else {
//         updatedFlattenedData.push(item);
//       }
//     });
  
//     // Assuming you have the necessary Google Sheets API client set up
//     // Replace 'YOUR_SHEET_ID' and 'YOUR_RANGE' with your actual Sheet ID and range
//     const request = {
//       spreadsheetId: 'YOUR_SHEET_ID',
//       range: 'YOUR_RANGE',
//       valueInputOption: 'USER_ENTERED',
//       resource: { values: updatedFlattenedData.map(item => Object.values(item)) }
//     };
  
//     // Call the Google Sheets API to update the sheet with the data
//     gapi.client.sheets.spreadsheets.values.update(request)
//       .then(response => {
//         console.log('Data updated in Google Sheets successfully!');
//       })
//       .catch(err => {
//         console.error('Error updating data in Google Sheets:', err);
//       });
//   }
  
// }
