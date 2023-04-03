// src/app/element-measurements/element-measurements.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementMeasurement, User, CreateElementMeasurement } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ElementMeasurementsService {
  private apiUrl = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

  // List all element measurements or by user
  getElementMeasurements(userId?: number): Observable<ElementMeasurement[]> {
    const url = userId
      ? `${this.apiUrl}/users/${userId}/element_measurements`
      : `${this.apiUrl}/element_measurements`;
    return this.http.get<ElementMeasurement[]>(url);
  }

  // Get a specific element measurement
  getElementMeasurement(userId: number, id: number): Observable<ElementMeasurement> {
    const url = `${this.apiUrl}/users/${userId}/element_measurements/${id}`;
    return this.http.get<ElementMeasurement>(url);
  }

  // Create a new element measurement
  createElementMeasurement(elementMeasurement: CreateElementMeasurement): Observable<ElementMeasurement> {
    const url = `${this.apiUrl}/element_measurements`;
    return this.http.post<ElementMeasurement>(url, { element_measurement: elementMeasurement });
  }

  // Update an existing element measurement
  updateElementMeasurement(userId: number, id: number, data: ElementMeasurement): Observable<ElementMeasurement> {
    const url = `${this.apiUrl}/users/${userId}/element_measurements/${id}`;
    return this.http.put<ElementMeasurement>(url, data);
  }

  // Delete an element measurement
  deleteElementMeasurement(userId: number, id: number): Observable<void> {
    const url = `${this.apiUrl}/users/${userId}/element_measurements/${id}`;
    return this.http.delete<void>(url);
  }
}

