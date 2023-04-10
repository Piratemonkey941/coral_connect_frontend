// src/app/element-measurements/element-measurements.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementMeasurement, User, CreateElementMeasurement } from '../model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class ElementMeasurementsService {
  private apiUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) {}

  // List all element measurements or by user
  getElementMeasurements(userId?: number): Observable<ElementMeasurement[]> {
    const url = userId
      ? `${this.apiUrl}/api/v1/users/${userId}/element_measurements`
      : `${this.apiUrl}/api/v1/element_measurements`;
    return this.http.get<ElementMeasurement[]>(url);
  }

  // Get a specific element measurement
  getElementMeasurement(userId: number, id: number): Observable<ElementMeasurement> {
    const url = `${this.apiUrl}/api/v1/users/${userId}/element_measurements/${id}`;
    return this.http.get<ElementMeasurement>(url);
  }

  // Create a new element measurement
  createElementMeasurement(elementMeasurement: CreateElementMeasurement): Observable<ElementMeasurement> {
    const userId = elementMeasurement.user_id
    const url = `${this.apiUrl}/api/v1/users/${elementMeasurement.user_id}/element_measurements`;

    // Get the authentication token (replace this with the correct method to get the token in your app)
    const authToken = this.authService.getToken();

    // Add the token to the request headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken.value}`
      })
    };

    return this.http.post<ElementMeasurement>(url, { element_measurement: elementMeasurement }, httpOptions);
  }


  // Update an existing element measurement
  updateElementMeasurement(userId: number, id: number, data: ElementMeasurement): Observable<ElementMeasurement> {

    const url = `${this.apiUrl}/api/v1/users/${userId}/element_measurements/${id}`;
    return this.http.put<ElementMeasurement>(url, data);
  }

  // Delete an element measurement
  deleteElementMeasurement(userId: number, id: number): Observable<void> {
    const url = `${this.apiUrl}/api/v1/users/${userId}/element_measurements/${id}`;
    return this.http.delete<void>(url);
  }
}

