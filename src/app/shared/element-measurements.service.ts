// src/app/element-measurements/element-measurements.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementMeasurement, User,  } from '../model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElementMeasurementsService {
  private apiUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService
    ) {}

  // List all element measurements or by user
  getElementMeasurements(userId?: number): Observable<ElementMeasurement[]> {
    const url = userId
      ? `${this.apiUrl}/api/v1/users/${userId}/element_measurements`
      : `${this.apiUrl}/api/v1/element_measurements`;

    // Get the authentication token
    const authToken = this.authService.getToken();

    // Add the token to the request headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken.value}`
      })
    };
    return this.http.get<ElementMeasurement[]>(url, httpOptions);
  }

  // Get a specific element measurement
  getElementMeasurement(userId: number, id: number): Observable<ElementMeasurement> {
    const url = `${this.apiUrl}/api/v1/users/${userId}/element_measurements/${id}`;
    return this.http.get<ElementMeasurement>(url);
  }

  // Create a new element measurement

// Create a new element measurement
elementMeasurement(elementMeasurement: Omit<ElementMeasurement, "id" | "created_at" | "updated_at">): Observable<ElementMeasurement> {

  const userId = this.userService.getCurrentUserId(); // Change this line
  if (!userId) {
    console.error('User ID not available');
    return throwError('User ID not available');
  }
  const url = `${this.apiUrl}/api/v1/users/${userId}/element_measurements`;

  // Get the authentication token (replace this with the correct method to get the token in your app)
  const authToken = this.authService.getToken();

  // Add the token to the request headers
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken.value}`
    })
  };

  return this.http.post<ElementMeasurement>(url, { element_measurement: { ...elementMeasurement, user_id: userId } }, httpOptions);
}


  // elementMeasurement (elementMeasurement: ElementMeasurement ): Observable<ElementMeasurement> {
  //   const userId = this.authService.getCurrentUserId();
  //   if (userId) {
  //   const url = `${this.apiUrl}/api/v1/users/${elementMeasurement.user_id}/element_measurements`;

  //   // Get the authentication token (replace this with the correct method to get the token in your app)
  //   const authToken = this.authService.getToken();

  //   // Add the token to the request headers
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${authToken.value}`
  //     })
  //   };

  //   return this.http.post<ElementMeasurement>(url, { element_measurement: elementMeasurement }, httpOptions);
  // }else {
  //     console.error('User ID not available');
  //   }
  // }


  // Update an existing element measurement
//  updateElementMeasurement(userId: number, id: number, data: ElementMeasurement ): Observable<ElementMeasurement > {
//   const url = `${this.apiUrl}/api/v1/users/${userId}/element_measurements/${id}`;
//   return this.http.put<ElementMeasurement >(url, data);
// }

updateElementMeasurement(userId: number, id: number, measurementData: ElementMeasurement): Observable<ElementMeasurement> {
  const updateData = {
    qt: measurementData.qt,
    reef_water_element_id: measurementData.reef_water_element_id,
    user_id: measurementData.user_id,
  };

  return this.http.put<ElementMeasurement>(`${this.apiUrl}/api/v1/users/${userId}/element_measurements/${id}`, {element_measurement: updateData});
}

  // Delete an element measurement
  deleteElementMeasurement(userId: number, id: number): Observable<void> {
    const url = `${this.apiUrl}/api/v1/users/${userId}/element_measurements/${id}`;
    return this.http.delete<void>(url);
  }
}

