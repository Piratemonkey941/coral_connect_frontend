import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ElementMeasurementsService } from './element-measurements.service';
import { ElementMeasurement } from '../models/create-element-measurement.model';

@Injectable({
  providedIn: 'root',
})
export class ElementMeasurementSenderService {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private elementMeasurementsService: ElementMeasurementsService
  ) {}

  sendMeasurement(value: number, reefWaterElementId: number) {
    const loggedIn = this.authService.isLoggedIn();
    const currentUser = this.userService.currentUserSubject.value;
    const token = this.authService.getToken();
    console.log('Is logged in:', loggedIn, 'User:', currentUser, 'Token:', token);

    if (loggedIn) {
      console.log('User is logged in, sending measurement');
      const userId = this.authService.getCurrentUserId();

      const newMeasurement: ElementMeasurement = {
        qt: value,
        reef_water_element_id: reefWaterElementId,
        user_id: userId,
      };

      this.elementMeasurementsService.elementMeasurement(newMeasurement).subscribe(
        (response) => {
          console.log('Measurement saved:', response);
        },
        (error) => {
          console.error('Error saving measurement:', error);
        }
      );
    } else {
      console.warn('User is not logged in, not sending measurement');
    }
  }
}
