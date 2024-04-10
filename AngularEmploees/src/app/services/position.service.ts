import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiUrl = 'https://localhost:7087/api/Position ';

  constructor(private http: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiUrl}`);
  }

  getPositionById(id: number): Observable<Position> {
    return this.http.get<Position>(`${this.apiUrl}/${id}`);
  }

  addPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(`${this.apiUrl}`, position);
  }

  updatePosition(position: Position): Observable<Position> {
    return this.http.put<Position>(`${this.apiUrl}/${position.id}`, position);
  }

  deletePosition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
