import { Component, OnInit } from '@angular/core';
import { ElementMeasurementsService } from '.././shared/element-measurements.service';
import { ElementMeasurement } from '../model';
@Component({
  selector: 'app-api-tester',
  templateUrl: './api-tester.component.html',
  styleUrls: ['./api-tester.component.scss']
})
export class ApiTesterComponent implements OnInit {
  elementMeasurements: ElementMeasurement[];

  constructor(private elementMeasurementsService: ElementMeasurementsService) {}

  ngOnInit(): void {
    this.fetchElementMeasurements();
  }

  fetchElementMeasurements(): void {
    this.elementMeasurementsService.getElementMeasurements().subscribe((data) => {
      this.elementMeasurements = data;
    });
  }
}
