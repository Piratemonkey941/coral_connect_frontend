import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
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
  elementMeasurements = new MatTableDataSource<ElementMeasurement>();
  selectedElementMeasurement: ElementMeasurement  | null = null;
  displayedColumns: string[] = ['id', 'qt', 'reef_water_element_id', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private elementMeasurementsService: ElementMeasurementsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadElementMeasurements();
    this.elementMeasurements.sort = this.sort;
  }

  loadElementMeasurements(): void {
    this.elementMeasurementsService.getElementMeasurements().subscribe((measurements) => {
      this.elementMeasurements.data = measurements;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.elementMeasurements.filter = filterValue.trim().toLowerCase();
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
      this.elementMeasurements.data = [...this.elementMeasurements.data, newMeasurement];
    });
  }

  onUpdate(elementMeasurement: ElementMeasurement ): void {
    this.elementMeasurementsService.updateElementMeasurement(elementMeasurement.user_id, elementMeasurement.id, elementMeasurement).subscribe((updatedMeasurement) => {
      const index = this.elementMeasurements.data.findIndex((measurement) => measurement.id === updatedMeasurement.id);
      const updatedData = [...this.elementMeasurements.data];
      updatedData[index] = updatedMeasurement;
      this.elementMeasurements.data = updatedData;
      });
      }

      onDelete(elementMeasurement: ElementMeasurement ): void {
      this.elementMeasurementsService.deleteElementMeasurement(elementMeasurement.user_id, elementMeasurement.id).subscribe(() => {
      this.elementMeasurements.data = this.elementMeasurements.data.filter((measurement) => measurement.id !== elementMeasurement.id);
      });
      }
      }
