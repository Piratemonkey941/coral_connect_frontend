import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';
import { AuthService } from '.././shared/auth.service';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ElementMeasurement   } from '.././models/create-element-measurement.model'; // Make sure this path is correct
import { ElementMeasurementsService } from '.././shared/element-measurements.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  private newLabel? = 'New label';
  currentUser: any;
  private currentUserSubscription: Subscription;


  constructor
    (
      private userService: UserService,
      private authService: AuthService,
      private http: HttpClient,
      private elementMeasurementService: ElementMeasurementsService
    )
    {
      Chart.register(Annotation)
    }

    ngOnInit(): void {
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
        console.log('Current user:', this.currentUser); // Add this line
      });
    }
  // WILL NEED MODAL

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

    logout() {
      this.authService.logout();
    }

}
