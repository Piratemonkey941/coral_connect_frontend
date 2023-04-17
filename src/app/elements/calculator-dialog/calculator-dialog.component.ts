import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementCalculatorService } from '../../shared/element-calculator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-calculator-dialog',
  templateUrl: './calculator-dialog.component.html',
  styleUrls: ['./calculator-dialog.component.scss']
})
export class CalculatorDialogComponent implements OnInit {
  calculatorForm: FormGroup;
  result: any;

  constructor(
    public dialogRef: MatDialogRef<CalculatorDialogComponent>,
    private elementCalculatorService: ElementCalculatorService,
    @Inject(MAT_DIALOG_DATA) public data: {selectedElement: string},
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }



  createForm(): void {
    if (this.data.selectedElement === 'Alkalinity' || this.data.selectedElement === 'Magnesium') {
      this.calculatorForm = this.formBuilder.group({
        desired: ['', Validators.required],
        current: ['', Validators.required],
        additive: ['', Validators.required],
        // volume: ['', Validators.required],
      });
    } else if (this.data.selectedElement === 'Calcium') {
      this.calculatorForm = this.formBuilder.group({
        desired: ['', Validators.required],
        current: ['', Validators.required],
      });
    }
  }


  onSubmit(): void {
    if (this.calculatorForm.valid) {
      if (this.data.selectedElement === 'Alkalinity') {
        this.result = this.elementCalculatorService.alkinityCalculator(
          this.calculatorForm.value.desired,
          this.calculatorForm.value.current,
          this.calculatorForm.value.additive,
          'Alkalinity'
        );
      } else if (this.data.selectedElement === 'Calcium') {
        this.result = this.elementCalculatorService.calciumCalculator(
          this.calculatorForm.value.desired,
          this.calculatorForm.value.current
        );
      } else if (this.data.selectedElement === 'Magnesium') {
        this.result = this.elementCalculatorService.magnesiumCalculator(
          this.calculatorForm.value.desired,
          this.calculatorForm.value.current,
          this.calculatorForm.value.additive
        );
      }
    }
  }


}
