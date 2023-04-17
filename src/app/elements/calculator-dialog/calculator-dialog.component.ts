import { Component, OnInit, Inject  } from '@angular/core';
import { ElementCalculatorService } from '../../shared/element-calculator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-calculator-dialog',
  templateUrl: './calculator-dialog.component.html',
  styleUrls: ['./calculator-dialog.component.scss']
})
export class CalculatorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CalculatorDialogComponent>,
    private elementCalculatorService: ElementCalculatorService,
    @Inject(MAT_DIALOG_DATA) public data: {selectedElement: string}
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
