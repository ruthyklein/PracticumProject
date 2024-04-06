import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Employee } from '../models/employee.model';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }


  exportToExcel(employees: Employee[], fileName: string) {
    const flattenedData = employees.flatMap(employee => {
      return employee.positionList.map(positionData => ({
        ID: employee.id,
        IDNumber: employee.idNumber,
        FirstName: employee.firstName,
        LastName: employee.lastName,
        Gender: employee.gender,
        DateOfBirth: employee.dateOfBirth,
        StartOfWorkDate: employee.startOfWorkDate,
        PositionName: positionData.position.name,
        EntryDate: positionData.entryDate,
        IsAdministrative: positionData.isAdministrative
      }));
    });
  
    const updatedFlattenedData = [];
    flattenedData.forEach(item => {
      const positions = item.PositionName.split(',');
      if (positions.length > 1) {
        positions.forEach(position => {
          updatedFlattenedData.push({
            ...item,
            PositionName: position.trim()
          });
        });
      } else {
        updatedFlattenedData.push(item);
      }
    });
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(updatedFlattenedData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }
  
  saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
