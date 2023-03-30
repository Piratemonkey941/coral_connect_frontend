import { Component, ElementRef, OnInit, ViewChild, Input, Output } from '@angular/core';
// import { ElementCalculatorService } from 'src/app/shared/element-calculator.service';
import { VolumeService } from 'src/app/shared/volume.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
