import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementMeasurement } from 'src/app/model';

@Component({
  selector: 'app-update-measurement-dialog',
  templateUrl: './update-measurement-dialog.component.html',
  styleUrls: ['./update-measurement-dialog.component.scss']
})
export class UpdateMeasurementDialogComponent {
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateMeasurementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ElementMeasurement,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      qt: [data.qt, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    if (this.updateForm.valid) {
      this.dialogRef.close(this.updateForm.value);
    }
  }
}
