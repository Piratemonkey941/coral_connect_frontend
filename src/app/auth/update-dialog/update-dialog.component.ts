import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent {
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private authservice: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateForm = this.formBuilder.group({
      first_name: [data.first_name, Validators.required],
      last_name: [data.last_name, Validators.required],
      phone: [data.phone, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      password_confirmation: ['']
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.updateForm.valid) {
      const updateData = this.updateForm.value;
      this.authservice.updateAccount(this.data.id, updateData).subscribe(
        (response) => {
          console.log('Account updated successfully', response)
          this.dialogRef.close({success: true});
        },
          (error) => {
            console.error('account update FAILED:', error);
            this.dialogRef.close({ success: false})
          }
      );
    }
  }
}
