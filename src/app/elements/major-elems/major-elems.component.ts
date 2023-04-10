

import { Component, ElementRef, OnInit, ViewChild, Input, Output } from '@angular/core';
import { VolumeService } from 'src/app/shared/volume.service';
import { BreakpointService } from '../../shared/breakpoint.service';
import { ElementMeasurementSenderService } from '../../shared/element-measurement-sender.service';
declare var window: any;

@Component({
  selector: 'app-major-elems',
  templateUrl: './major-elems.component.html',
  styleUrls: ['./major-elems.component.scss']
})
export class MajorElemsComponent implements OnInit {

  numCols: number;
  formModal:any;                              // something for modal
  selectedElement: string = ''

  @Input() receivedValue: String;
  @Input() volume: number

  constructor(
    public volumeService: VolumeService,
    private breakpointService: BreakpointService,
    private elementMeasurementSenderService: ElementMeasurementSenderService,
    ) { }


  ngOnInit(): void {
    this.breakpointService.numCols$.subscribe((numCols) => {
      this.numCols = numCols;
    });



  }

  // MODAL CODE

    openModal(){
      this.formModal.show();
    }

    closeModal(){
      this.formModal.hide();
    }


// ==================================================== BORON ====================================================

boron: number
boronStart: string = 'Are you a metal or not?!'

boronAdjustment: number
boronAdjustmentTotal: number
boronDays: number
boronQuantityDivisor: number


onAddBoron(){ // for basic calculation on card

// general boron calculation
this.boronDays = Math.ceil(6 - this.boron)   // 2
this.boronQuantityDivisor = (6 - this.boron) // 6 - 4.5 = 1.5
this.boronAdjustmentTotal = (0.9464 * this.volumeService.volume) * this.boronQuantityDivisor // 94.64
this.boronAdjustment = parseFloat((this.boronAdjustmentTotal / this.boronDays).toFixed(2));



  if (this.boron == 6){
      this.boronStart = 'Ideal Boron for most reefs'
  }
//low start  9.46ml at 100 g for 0.1 ppm increase
// 94.64ml per day for 1 ppm recovery
  else if ( this.boron <= 2 && this.boron >= 0 ){
    this.boronStart = `Boron low, adjust  ${this.boronAdjustment}ml per day for ${this.boronDays} days.  `
  }
  else if ( this.boron <= 5.9 && this.boron >= 2.1 ){
    this.boronStart = `Boron slighty low, adjust ${this.boronAdjustment}ml per day for ${this.boronDays} days.`
    }
  //high start
  else if ( this.boron <= 6.5  && this.boron >= 6.1){
    this.boronStart = 'Acceptable Range However RM method recomends adjusting to 6 '
  }
  else if ( this.boron <= 8  && this.boron >= 6.6 ){
    this.boronStart = 'Boron slightly elevated recomendation is to allow level to settle down and watch ICP '
  }
  else if ( this.boron <= 10  && this.boron >= 8.1 ){
    this.boronStart = 'Boron critically elevated recomendation is to allow level to settle down and watch ICP '
  }
  else if ( this.boron <= 20 && this.boron >= 10.1 ){
    this.boronStart = 'Boron extremely elevated recomendation is preform several small water changes. 20% water change to reduce level apx 10%'
  }
  else {
    this.boronStart = 'Retest parameter'
  }
}
sendBoronMeasurement(boron: number) {
  this.elementMeasurementSenderService.sendMeasurement(boron, 5);
}

// ==================================================== BROMIDE ====================================================!

bromide: number
bromideStart: string = 'Are you a metal or not?!'

bromideAdjustment: number
bromideAdjustmentTotal: number
bromideDays: number
bromideQuantityDivisor: number

  onAddBromide(){

      // general boron calculation
      this.bromideDays = Math.ceil(85 - this.bromide)   // 2
      this.bromideQuantityDivisor = (85 - this.bromide) // 6 - 4.5 = 1.5
      this.bromideAdjustmentTotal = (0.0701 * this.volumeService.volume) * this.bromideQuantityDivisor // 94.64
      this.bromideAdjustment = parseFloat((this.bromideAdjustmentTotal / this.bromideDays).toFixed(2));

        if (this.bromide == 85){
            this.bromideStart = 'Ideal Bromide for most reefs'
        }
      //low start  9.46ml at 100 g for 0.1 ppm increase
      // 94.64ml per day for 1 ppm recovery
        else if ( this.bromide <= 45 && this.bromide >= 0 ){
          this.bromideStart = `Bromide depleted, adjust  ${this.bromideAdjustment}ml per day for ${this.bromideDays} days.`
        }
        else if ( this.bromide <= 80 && this.bromide >= 46 ){
          this.bromideStart = `Bromide low, adjust  ${this.bromideAdjustment}ml per day for ${this.bromideDays} days.  `
        }
        else if ( this.bromide <= 84 && this.bromide >= 81){
          this.bromideStart = `Bromide slighty low, adjust ${this.bromideAdjustment}ml per day for ${this.bromideDays} days.`
          }
        //high start
        else if ( this.bromide <= 100  && this.bromide >= 86){
          this.bromideStart = 'Bromide slightly elevated recomendation is to allow level to settle down and watch ICP '
        }
        else if ( this.bromide <= 120  && this.bromide >= 101 ){
          this.bromideStart = 'Bromide critically elevated, do not exede 110/120. Recomended: allow level to settle down and watch ICP '
        }
        else if ( this.bromide <= 150 && this.bromide >= 121 ){
          this.bromideStart = 'Bromide extremely elevated recomendation is preform several small water changes. 20% water change to reduce level apx 10%'
        }
        else {
          this.bromideStart = 'Retest parameter'
        }
      }

      sendBromideMeasurement(bromide: number) {
        this.elementMeasurementSenderService.sendMeasurement(bromide, 6);
      }

  // ==================================================== POTASSIUM ====================================================!

  potassiumStart: string = 'Instead of becoming fireworks, Im going to make your corals glow!'
  potassium: number
  potassiumAdjustment: any
  potassiumAdjustmentTotal: number
  potassiumDays: number
  potassiumQuantityDivisor: number

  onAddPotassium(){

      // general boron calculation
      this.potassiumDays = Math.ceil((410 - this.potassium)/10)   // = 10 is cieling to 10 need it to go to 1  need to dev by 10
      this.potassiumQuantityDivisor = ((410 - this.potassium)/10) // 410 - 4.5 = 1.5
      this.potassiumAdjustmentTotal = (0.7725 * this.volumeService.volume) * this.potassiumQuantityDivisor
      this.potassiumAdjustment = parseFloat((this.potassiumAdjustmentTotal / this.potassiumDays).toFixed(2));


        if (this.potassium === 410){
            this.potassiumStart = 'Ideal  for most reefs'
            this.potassiumDays = 1;
        }
      //low start  7.72ml at 100 g for 0.1 ppm increase

        else if ( this.potassium <= 330 && this.potassium >= 250){
          this.potassiumStart = `Depleted Potassium Level, Correct immedietly ${this.potassiumAdjustment}ml per day for ${this.potassiumDays} days.  `
        }
        else if ( this.potassium <= 381 && this.potassium >= 331 ){
          this.potassiumStart = `Very Low Potassium Level, adjust  ${this.potassiumAdjustment}ml per day for ${this.potassiumDays} days.  `
        }
        else if ( this.potassium <= 400 && this.potassium >= 381 ){
          this.potassiumStart = `Reduced Potassium, adjust  ${this.potassiumAdjustment}ml per day for ${this.potassiumDays} days.  `
        }
        else if ( this.potassium <= 409 && this.potassium >= 401 ){
          this.potassiumStart = `Potassium optimal, adjust ${this.potassiumAdjustment}ml per day for ${this.potassiumDays} days.`
          }

        //high start
        else if ( this.potassium <= 420  && this.potassium >= 411){
          this.potassiumStart = 'Potassium Range Optimal '
        }
        else if ( this.potassium <= 500  && this.potassium >= 421 ){
          this.potassiumStart = 'Potassium slightly elevated recomendation is to allow level to settle down and watch ICP '
        }
        else if ( this.potassium <= 600  && this.potassium >= 501 ){
          this.potassiumStart = 'Potassium extremely elevated recomendation is preform several small water changes. 20% water change to reduce level apx 10%'
        }
        else {
          this.potassiumStart = 'Retest parameter'
        }
      }

      sendPotassiumMeasurement(potassium: number) {
        this.elementMeasurementSenderService.sendMeasurement(potassium, 7);
      }

// ==================================================== STRONTIUM ==================================================== !
strontiumStart: string = 'Instead of becoming fireworks, Im going to make your corals glow!'
strontium: number
strontiumAdjustment: any
strontiumAdjustmentTotal: number
strontiumDays: number
strontiumQuantityDivisor: number

onAddStrontium(){

    // general boron calculation
    this.strontiumDays = Math.ceil(10 - this.strontium)   // 2
    this.strontiumQuantityDivisor = (10 - this.strontium) // 410 - 4.5 = 1.5
    this.strontiumAdjustmentTotal = (0.0701 * this.volumeService.volume) * this.strontiumQuantityDivisor
    this.strontiumAdjustment = this.strontiumAdjustmentTotal / this.strontiumDays


      if (this.strontium == 10){
          this.strontiumStart = 'Ideal  for most reefs'
      }
    //low start  7.72ml at 100 g for 0.1 ppm increase

      else if ( this.strontium <= 3 && this.strontium >= 0){
        this.strontiumStart = `Depleted strontium Level, Correct immedietly ${this.strontiumAdjustment}ml per day for ${this.strontiumDays} days.  `
      }
      else if ( this.strontium <= 6 && this.strontium >= 3.1 ){
        this.strontiumStart = `Low strontium level, adjust  ${this.strontiumAdjustment}ml per day for ${this.strontiumDays} days.  `
      }
      else if ( this.strontium <= 9 && this.strontium >= 6.1 ){
        this.strontiumStart = `Reduced strontium, adjust  ${this.strontiumAdjustment}ml per day for ${this.strontiumDays} days.  `
      }
      else if ( this.strontium <= 9.9 && this.strontium >= 9.1 ){
        this.strontiumStart = `Optimal Range for strontium, adjust ${this.strontiumAdjustment}ml per day for ${this.strontiumDays} days.`
        }

      //high start
      else if ( this.strontium <= 12  && this.strontium >= 10.1){
        this.strontiumStart = 'Strontium Range Optimal '
      }
      else if ( this.strontium <= 25  && this.strontium >= 12.1 ){
        this.strontiumStart = 'Strontium slightly elevated recomendation is to allow level to settle down and watch ICP '
      }
      else if ( this.strontium <= 60  && this.strontium >= 25.1 ){
        this.strontiumStart = 'Strontium critical! elevated recomendation is preform several small water changes. 20% water change to reduce level apx 10%'
      }
      else {
        this.strontiumStart = 'Retest parameter'
      }
    }

    sendStrontiumMeasurement(strontium: number) {
      this.elementMeasurementSenderService.sendMeasurement(strontium, 8);
    }

// ==================================================== SULFATE ====================================================!

sulfateStart: string = 'Instead of becoming fireworks, Im going to make your corals glow!'
sulfate: number

onAddSulfate(){
      if ( this.sulfate <= 2800 && this.sulfate >= 2251 )
      {
        this.sulfateStart = 'Sulfate Range Optimal '
      }
      else if ( this.sulfate <= 2250 && this.sulfate >= 1201)
      {
        this.sulfateStart = 'Very low Sulfate levels. Can be a result of low salinity'
      }
      else if ( this.sulfate <= 1200 && this.sulfate >= 0)
      {
        this.sulfateStart = 'Extremely low Sulfate levels. Can be a result of low salinity'
      }

      else if ( this.sulfate <= 3300  && this.sulfate >= 2801 )
      {
        this.sulfateStart = 'Sulfate slightly elevated if salinity is in range'
      }
      else if ( this.sulfate <= 3500  && this.sulfate >= 3301 )
      {
        this.sulfateStart = 'Sulfate very elevated if salinity is in range'
      }
      else {
        this.sulfateStart = 'Retest parameter'
      }
    }

    sendSulfateMeasurement(sulfate: number) {
      this.elementMeasurementSenderService.sendMeasurement(sulfate, 9);
    }

  }
