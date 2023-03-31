import { Component, ElementRef, OnInit, ViewChild, Input, Output } from '@angular/core';
// import { ElementCalculatorService } from 'src/app/shared/element-calculator.service';
import { VolumeService } from 'src/app/shared/volume.service';
declare var window: any;


@Component({
  selector: 'app-minor-elems-one',
  templateUrl: './minor-elems-one.component.html',
  styleUrls: ['./minor-elems-one.component.scss']
})
export class MinorElemsOneComponent implements OnInit {


  formModal:any;                              // something for modal
  selectedElement: string = ''

  @Input() receivedValue: String;

  @Input() volume: number
  constructor( public volumeService: VolumeService) { }


  ngOnInit(): void {



  }

  // MODAL CODE

    openModal(){
      this.formModal.show();
    }

    closeModal(){
      this.formModal.hide();
    }

// ==================================================== Barium ====================================================
 bariumStart: string = 'Barium, the master of coral skeletons, blending into aragonite and whispering tales of the deep!'
 barium: number
 bariumAdjustment: any
 bariumAdjustmentTotal: number
 bariumDays: number
 bariumQuantityDivisor: number
 bariumAdjustmentGT: number
 bariumDaysDiv: number
onAddBarium(){

    // general barium calculation
    this. bariumDays = (15 - this.barium)  // 2

    this. bariumQuantityDivisor = (15 - this.barium) // 410 - 4.5 = 1.5
    this. bariumAdjustmentTotal = (0.0378 * this.volumeService.volume) * this. bariumQuantityDivisor

      if (this. barium == 15){
          this. bariumStart = 'Ideal  for most reefs'
      }
      else if ( this.barium <= 5.9 && this. barium >= 0 ){
        this.bariumAdjustment = parseFloat(( (this.bariumDays * 9)/4).toFixed(2));
        this. bariumStart = `Extremely Low  Barium level, adjust  ${this.bariumAdjustment}ml per day for 4 days.  `
      }
      else if ( this.barium <= 8 && this. barium >= 6 ){

        this.bariumAdjustment = parseFloat(( (this.bariumDays * 11)/3).toFixed(2));


        this. bariumStart = `Very Low  Barium level, adjust  ${this.bariumAdjustment}ml per day for 3 days.  `
      }
      else if ( this.barium <= 13 && this. barium >= 8.1 ){
        this. bariumAdjustment = parseFloat((this.bariumAdjustmentTotal).toFixed(2));
        this. bariumStart = `Low  Barium level, adjust  ${this.bariumAdjustment}ml  `
      }

      else if ( this. barium <= 14.9 && this. barium >= 13.1 ){
        this.bariumStart = `Acceptable Range for  Barium, adjust ${this.bariumAdjustment}ml per day for ${this.bariumDays} days.`
        }

      //high start
      else if ( this. barium <= 30  && this.barium >= 15.1){
        this.bariumStart = ' Barium slightly elevated recomendation is to allow level to settle down and watch ICP '
      }
      else if ( this. barium <= 90  && this.barium >= 30.1){
        this.bariumStart = ' Barium significantly elevated recomendation is to allow level to settle down and watch ICP '
      }
      else if ( this. barium <= 160  && this.barium >= 90.1 ){
        this.bariumStart = ' Barium critical! elevated recomendation is preform several small water changes. 20% water change to reduce level apx 10%'
      }
      else {
        this.bariumStart = 'Retest parameter'
      }
    }

  // parseFloat(().toFixed(2));
    // ==================================================== Chromium ====================================================
chromiumStart: string = 'Chromium, call me the ultimate makeover artist, turning ordinary corals into glamorous divas!'
chromium: number
chromiumNano: number
chomiumRegular: number

onAddChromium(){

  this.chomiumRegular = (0.00076 * this.volumeService.volume)  // round to 2 places?
  this.chromiumNano = (0.01 * this.volumeService.volume)

    if (this. chromium == 0){
        this. chromiumStart =
        `Ideal, should remain undetectable. Recomended dose of ${this.chomiumRegular}ml RM classic Chromium or ${this.chromiumNano}ml RM NANO per Day`
    }
    else if ( this.chromium <= 2.5 && this. chromium >= 0.1 ){

      this. chromiumStart = `Chromium in very low level, if supplementing, stop dosing`
    }
    else if ( this.chromium <= 5 && this. chromium >= 2.6 ){

      this. chromiumStart = `Chromium in low level, if supplementing, stop dosing   `
    }
    else if ( this.chromium <= 10 && this. chromium >= 5.1 ){

      this. chromiumStart = `Chromium in high levels, if supplementing, stop dosing `
    }

    else if ( this. chromium <= 50 && this. chromium >= 10.1 ){
      this.chromiumStart = `Chromium in very high levels, if supplementing, stop dosing recomendation is to check equipment for degredation `
      }
    else {
      this.chromiumStart = 'Retest parameter'
    }
  }

    // ==================================================== Cobalt ====================================================
    cobaltStart: string = "Cobalt the vibrant virtuoso, jazzing up corals with my show-stopping shades of blue!"
    cobalt: number
    cobaltNano: number
    cobaltRegular: number

    onAddCobalt(){

      this.cobaltRegular = (0.00075 * this.volumeService.volume)
      this.cobaltNano = (0.01 * this.volumeService.volume)

        if (this.cobalt <= 0.1 && this. cobalt >= 0 ){
            this. cobaltStart =
            `Ideal, should remain near undetectable. Recomended dose of ${this.cobaltRegular}ml RM classic cobalt or ${this.cobaltNano}ml RM NANO per Day`
        }
        else if ( this.cobalt <= 2.5 && this. cobalt >= 0.2 ){

          this. cobaltStart = `Cobalt level very low , if supplementing, reduce dosage one third`
        }
        else if ( this.cobalt <= 5 && this. cobalt >= 2.6 ){

          this. cobaltStart = `Cobalt detected at low levels, if supplementing, stop dosing   `
        }
        else if ( this.cobalt <= 10 && this. cobalt >= 5.1 ){

          this. cobaltStart = `Cobalt detected at Ver low levels, if supplementing, stop dosing `
        }

        else if ( this. cobalt <= 50 && this. cobalt >= 10.1 ){
          this.cobaltStart = `Cobalt in very high levels, if supplementing, stop dosing recomendation is to check equipment for degredation `
          }
        else {
          this.cobaltStart = 'Retest parameter'
        }
      }
    // ==================================================== Copper ====================================================
copperStart: string = "Copper the life of the party, until I overdo it and become the third wheel that just won't leave!"
copper: number


onAddCopper(){

      if (this.copper <= 0.7 && this. copper >= 0 ){
        this. copperStart =
        `Ideal, should remain at or near undetectable.`
      }
      else if ( this.copper <= 5 && this. copper >= 0.8 ){

        this.copperStart = `Copper detected at very low levels, can effect coral flourescence. Reduces naturally without waterchanges. If there is an increase, check equipment for degredation`
      }
      else if ( this.copper <= 10 && this.copper >= 5.1 ){
        this.copperStart = `Copper detected at these levels will effect coral flourescence. Reduces naturally without waterchanges. If there is an increase, check equipment for degredation`
      }
      else if ( this.copper <= 50 && this.copper >= 10.1 ){
        this.copperStart = `Copper detected at these levels will effect coral flourescence. They will appear brown/dull. Preform 2-3 - 10-20% water changes & check equipment for degredation`
      }
      else {
        this.copperStart = 'Retest parameter'
      }
    }

    // ==================================================== fluoride ====================================================
fluorideStart: string = "Fluoride, coral's undercover dentist, keeping their skeletons strong beneath the waves!"
fluoride: number
fluorideAdjustmentTotal: number
fluorideDays: number


onAddFluoride(){

    // general boron calculation
    this.fluorideDays = (1.5 - this.fluoride)*10  // 2
    this.fluorideAdjustmentTotal = (0.37854 * this.volumeService.volume)



      if (this.fluoride == 1.5){
          this.fluorideStart = 'Ideal  for most reefs'
      }
    //low start  .37854ml at 1 g for 0.1 ppm increase

      else if ( this.fluoride <= 0.5 && this.fluoride >= 0 ){
        this.fluorideStart = `Depleted fluoride Level, Correct immedietly ${this.fluorideAdjustmentTotal}ml per day for ${this.fluorideDays} days.  `
      }
      else if ( this.fluoride <= 1.4 && this.fluoride >= 0.6 ){
        this.fluorideStart = `Below target level for fluoride, adjust ${this.fluorideAdjustmentTotal}ml per day for ${this.fluorideDays} days.`
        }

      //high start
      else if ( this.fluoride <= 1.8  && this.fluoride >= 1.6){
        this.fluorideStart = 'Fluoride slightly elevated recomendation is to allow level to settle down and watch ICP.'
      }
      else if ( this.fluoride <= 2  && this.fluoride >= 1.9 ){
        this.fluorideStart = 'Fluoride critically elevated recomendation is to allow level to settle down and watch ICP.'
      }
      else if ( this.fluoride <= 3 && this.fluoride >= 2.1 ){
        this.fluorideStart = 'Fluoride level critical! Recomendation is preform several small water changes. May be entering through RODI'
      }
      else {
        this.fluorideStart = 'Retest parameter'
      }
    }

    // ==================================================== Iodine ====================================================
iodineStart: string = 'Iodine the secret agent, keeping harmful oxidization at bay to maintain a healthy alliance!'
iodine: number
iodineAdjustment: any
iodineAdjustmentTotal: number
iodineDays: number
iodineQuantityDivisor: number

onAddIodine(){

    if (this.volumeService.volume/40 < 1) {

      this.iodineDays = Math.ceil(50/this.volumeService.volume)
      this.iodineAdjustmentTotal = 1


    } else {
      this.iodineAdjustmentTotal = Math.ceil(this.volumeService.volume/50);
      this.iodineDays = 1
    }

      if (this.iodine <= 95 && this.iodine >= 76 ){
          this.iodineStart = 'Ideal  for most reefs'
      }
    //low start  7.72ml at 100 g for 0.1 ppm increase

      else if ( this.iodine <= 25 && this.iodine >= 0){ // 2-3 drops per day  @ 100g
        this.iodineStart = `Iodine Depleted, recomended dose is ${this.iodineAdjustmentTotal} drops every ${this.iodineDays} days`
      }
      else if ( this.iodine <= 75 && this.iodine >= 26){  // 2-3 drops per day @ 100g
        this.iodineStart = `Iodine low, recomended dose is ${this.iodineAdjustmentTotal} drops every ${this.iodineDays} days`
        }

      //high start
      else if ( this.iodine <= 500  && this.iodine >= 96){
        this.iodineStart = 'Iodine slightly elevated recomendation is to allow level to settle down and watch ICP '
      }
      else if ( this.iodine <= 1500  && this.iodine >= 501){
        this.iodineStart = 'iodine highly elevated recomendation is to do water change and run carbon. Levels above 1000 can lead to browning or burnt tips'
      }

      else {
        this.iodineStart = 'Retest parameter'
      }
    }

}
