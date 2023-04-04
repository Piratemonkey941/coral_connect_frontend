import { Component, ElementRef, OnInit, HostListener, } from '@angular/core';
// import { ElementCalculatorService } from 'src/app/shared/element-calculator.service';
import { VolumeService } from 'src/app/shared/volume.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isSmallViewport: boolean;
  isMediumViewport: boolean;
  
  constructor() {
    this.updateViewportSize();
  }
  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateViewportSize();
  }

  updateViewportSize() {
    this.isSmallViewport = window.innerWidth <= 650;
    this.isMediumViewport = window.innerWidth > 650 && window.innerWidth <= 1500;
  }
}
