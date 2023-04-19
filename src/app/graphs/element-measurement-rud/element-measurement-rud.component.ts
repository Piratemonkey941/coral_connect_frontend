import { Component, OnInit } from '@angular/core';
import { ElementMeasurementsService } from '../../shared/element-measurements.service';
import { ElementMeasurement  } from 'src/app/model';
import { MatDialog } from '@angular/material/dialog';
import { UpdateMeasurementDialogComponent } from '../update-measurement-dialog/update-measurement-dialog.component';

@Component({
  selector: 'app-element-measurement-rud',
  templateUrl: './element-measurement-rud.component.html',
  styleUrls: ['./element-measurement-rud.component.scss']
})
export class ElementMeasurementsCrudComponent implements OnInit {
  elementMeasurements: ElementMeasurement [] = [];
  selectedElementMeasurement: ElementMeasurement  | null = null;
  displayedColumns: string[] = ['id', 'qt', 'reef_water_element_id', 'actions'];


  constructor(
    private elementMeasurementsService: ElementMeasurementsService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.loadElementMeasurements();
  }

  loadElementMeasurements(): void {
    this.elementMeasurementsService.getElementMeasurements().subscribe((measurements) => {
      this.elementMeasurements = measurements;
    });
  }

  onSelect(elementMeasurement: ElementMeasurement): void {
    const dialogRef = this.dialog.open(UpdateMeasurementDialogComponent, {
      data: elementMeasurement
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedMeasurement = { ...elementMeasurement, ...result };
        this.onUpdate(updatedMeasurement);
      }
    });
  }


  onCreate(elementMeasurement: ElementMeasurement ): void {
    this.elementMeasurementsService.elementMeasurement (elementMeasurement).subscribe((newMeasurement) => {
      this.elementMeasurements.push(newMeasurement);
    });
  }

  // src/app/element-measurements-crud/element-measurements-crud.component.ts

  onUpdate(elementMeasurement: ElementMeasurement ): void {
    this.elementMeasurementsService.updateElementMeasurement(elementMeasurement.user_id, elementMeasurement.id, elementMeasurement).subscribe((updatedMeasurement) => {
      const index = this.elementMeasurements.findIndex((measurement) => measurement.id === updatedMeasurement.id);
      this.elementMeasurements[index] = updatedMeasurement;
    });
  }


  onDelete(elementMeasurement: ElementMeasurement ): void {
    this.elementMeasurementsService.deleteElementMeasurement(elementMeasurement.user_id, elementMeasurement.id).subscribe(() => {
      this.elementMeasurements = this.elementMeasurements.filter((measurement) => measurement.id !== elementMeasurement.id);
    });
  }
}
