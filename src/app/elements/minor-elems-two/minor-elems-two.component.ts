import { Component, ElementRef, OnInit, ViewChild, Input, Output } from '@angular/core';
import { VolumeService } from 'src/app/shared/volume.service';
import { BreakpointService } from '../../shared/breakpoint.service';
import { ElementMeasurementSenderService } from '../../shared/element-measurement-sender.service';
declare var window: any;

@Component({
  selector: 'app-minor-elems-two',
  templateUrl: './minor-elems-two.component.html',
  styleUrls: ['./minor-elems-two.component.scss']
})
export class MinorElemsTwoComponent implements OnInit {

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


    // ==================================================== Iron ====================================================

ironStart: string = 'Instead of becoming fireworks, Im going to make your corals glow!'
iron: number
ironNano: number
ironRegular: number

onAddIron(){

  this.ironRegular = parseFloat((0.00035 * this.volumeService.volume).toFixed(2))  // round to 2 places?
  this.ironNano = parseFloat((0.01 * this.volumeService.volume).toFixed(2))


    if (this.iron <= 0.1 && this. iron >= 0 ){
        this.ironStart =
        `Ideal, should remain Low or Undetectable. Recomended dose of ${this.ironRegular}ml RM classic iron or ${this.ironNano}ml RM NANO per Day`
    }
    else if ( this.iron <= 1 && this. iron >= 0.11 ){

      this. ironStart = `Iron found in very low levels, if supplementing, reduce dosage`
    }
    else if ( this.iron <= 2.5 && this. iron >= 1.1 ){

      this. ironStart = `Iron found in low levels, if supplementing, reduce dosage. Iron at this level may cause browning of coral`
    }
    else if ( this.iron <= 10 && this. iron >= 2.6 ){

      this. ironStart = `Excessive iron detected. Cease supplementation and monitor for any further increase. It is recommended to inspect your equipment`
    }

    else if ( this. iron <= 50 && this. iron >= 10.1 ){
      this.ironStart = `Warning: High levels of iron detected. If you are supplementing, immediately stop dosing. To prevent further issues, it is recommended to check your equipment for degradation and perform water changes.`
      }
    else {
      this.ironStart = 'Retest parameter'
    }
  }

  sendIronMeasurement(iron: number) {
    this.elementMeasurementSenderService.sendMeasurement(iron, 16);
  }

            // ==================================================== Lithium ====================================================
lithiumStart: string = 'Instead of becoming fireworks, Im going to make your corals glow!'
lithium: number
lithiumAdjustment: any
lithiumAdjustmentTotal: number
lithiumDays: number
lithiumDaysCalc: number
lithiumQuantityDivisor: number

onAddLithium(){

    // general lithium calculation
    this.lithiumDaysCalc = Math.ceil(100 - this.lithium)   // 2
    this.lithiumDays = Math.ceil((100 - this.lithium)/10)   // 2
    this.lithiumQuantityDivisor = (100 - this.lithium) // 410 - 4.5 = 1.5
    this.lithiumAdjustmentTotal = (0.03773 * this.volumeService.volume) * this.lithiumQuantityDivisor
    this.lithiumAdjustment = (this.lithiumAdjustmentTotal / this.lithiumDaysCalc).toFixed(2)


      if (this.lithium <= 200 && this.lithium >= 101){
          this.lithiumStart = 'Ideal  for most reefs'
      }
    //low start

      else if ( this.lithium <= 80 && this.lithium >= 0 ){
        this.lithiumStart = `Lithium very low, adjust  ${this.lithiumAdjustment}ml per day for ${this.lithiumDays} days.  `
      }
      else if ( this.lithium <= 100 && this.lithium >= 81 ){
        this.lithiumStart = `Lithium low, adjust ${this.lithiumAdjustment}ml per day for ${this.lithiumDays} days.`
        }

      //high start
      else if ( this.lithium <= 600  && this.lithium >= 201){
        this.lithiumStart = 'Lithium slightly elevated recomendation is to allow level to settle down and watch ICP. This can take several months'
      }
      else if ( this.lithium <= 1500 && this.lithium >= 601 ){
        this.lithiumStart = 'Lithium highly elevated recomendation Acceptable range is 100-350. Consider 20% water change'
      }
      else if ( this.lithium <= 3500  && this.lithium >= 1501 ){
        this.lithiumStart = 'Lithium critical! elevated recomendation is preform several small water changes. 20% water change to reduce level.'
      }
      else {
        this.lithiumStart = 'Retest parameter'
      }
    }

    sendLithiumMeasurement(lithium: number) {
      this.elementMeasurementSenderService.sendMeasurement(lithium, 17);
    }

        // ==================================================== Manganese ====================================================
manganeseStart: string = 'Instead of becoming fireworks, Im going to make your corals glow!'
manganese: number
manganeseNano: number
manganeseRegular: number

onAddManganese(){
  this.manganeseRegular = parseFloat((0.00037 * this.volumeService.volume).toFixed(2))  // round to 2 places?
    this.manganeseNano = parseFloat((0.01 * this.volumeService.volume).toFixed(2))


      if (this.manganese <= 0.1 && this.manganese >= 0){
        this.manganeseStart =
        `Ideal, should remain Low or Undetectable. Recomended dose of ${this.manganeseRegular}ml RM classic iron or ${this.manganeseNano}ml RM NANO per Day`
      }
      else if ( this.manganese <= 2.5 && this.manganese >= 0.2 ){
        this.manganeseStart = 'manganese detected at low levels, reduce dose'
      }
      else if ( this.manganese <= 5 && this.manganese >= 2.6 ){
        this.manganeseStart = 'manganese detected at low levels, stop dosing'
      }
      else if ( this.manganese <= 10  && this.manganese >= 5.1){
        this.manganeseStart = 'manganese detected at medium levels, stop dosing'
      }
      else if ( this.manganese <= 50 && this.manganese >= 10.1 ){
        this.manganeseStart = 'manganese detected at high levels, stop dosing. Recomendation is to preform 2 10%-20% water changes'
      }
      else {
        this.manganeseStart = 'Retest parameter'
      }
    }

    sendManganeseMeasurement(manganese: number) {
      this.elementMeasurementSenderService.sendMeasurement(manganese, 18);
    }

        // ==================================================== Molybdenum ====================================================

        molybdenumStart: string = 'Instead of becoming fireworks, Im going to make your corals glow!';
        molybdenum: number;
        molybdenumAdjustmentTotal: number;
        molybdenumAdjustmentDiv: any;

        onAddMolybdenum() {
            const molybdenumRanges = {                   // Define the different molybdenum ranges and their corresponding messages and divisors.
                15: {
                    message: 'Ideal for most reefs',
                    divisor: 1,                          // divisor is set to 1 since it does not matter in this case
                },
                low: [
                    { range: [0, 2.9], message: 'Very low molybdenum level', divisor: 5 },
                    { range: [3, 5.9], message: 'Very low molybdenum level', divisor: 4 },
                    { range: [6, 8.9], message: 'Very low molybdenum level', divisor: 3 },
                    { range: [9, 11.9], message: 'Low molybdenum level', divisor: 2 },
                    { range: [12, 14.9], message: 'Acceptable range for molybdenum', divisor: 1 },
                ],
                high: [
                    { range: [15.1, 12], message: 'Molybdenum range optimal' },
                    { range: [12.1, 25], message: 'Molybdenum slightly elevated' },
                    { range: [25.1, 60], message: 'Molybdenum critical' },
                ],
            };

            let range: { message: string, divisor?: number } = molybdenumRanges[15];    // Set the range based on the molybdenum value.

            for (const r of molybdenumRanges.low) {
                if (this.molybdenum >= r.range[0] && this.molybdenum <= r.range[1]) {
                    range = r;
                    break;
                }
            }
            if (!range) {
                for (const r of molybdenumRanges.high) {
                    if (this.molybdenum >= r.range[0] && this.molybdenum <= r.range[1]) {
                        range = r;
                        break;
                    }
                }
            }

            this.molybdenumAdjustmentTotal = (0.03785 * this.volumeService.volume) * (15 - this.molybdenum);                           // Calculate the molybdenum adjustment based on the total adjustment and the range divisor.
            this.molybdenumAdjustmentDiv = `${(this.molybdenumAdjustmentTotal / (range.divisor || 1)).toFixed(2)} ml`;
            this.molybdenumStart = `${range.message}, adjust ${this.molybdenumAdjustmentDiv} per day for ${range.divisor || 1} days.`;  // Set the molybdenum start message based on the range and the calculated adjustment.
        }

  sendMolybdenumMeasurement(molybdenum: number) {
    this.elementMeasurementSenderService.sendMeasurement(molybdenum, 19);
  }

  // ==================================================== Nickle ====================================================

  nickelStart = 'Instead of becoming fireworks, Im going to make your corals glow!';
  nickel: number;
  nickelAdjustment: number;
  nickelAdjustmentTotal: number;
  nickelDays: number;
  nickelQuantityDivisor: number;

  onAddNickel() {
    if (this.nickel >= 2) {
      this.nickelDays = 1;
    } else if (this.nickel >= 1.5) {
      this.nickelDays = 2;
    } else if (this.nickel >= 1) {
      this.nickelDays = 3;
    } else if (this.nickel >= 0.5) {
      this.nickelDays = 4;
    } else {
      this.nickelDays = 5;
    }

    this.nickelQuantityDivisor = (2.5 - this.nickel) * 10;
    this.nickelAdjustmentTotal = 0.003785 * this.volumeService.volume * this.nickelQuantityDivisor;
    this.nickelAdjustment = Number((this.nickelAdjustmentTotal / this.nickelDays).toFixed(2));

    if (this.nickel == 2.5) {
      this.nickelStart = 'Ideal for most reefs';
    } else if (this.nickel === 0 || (this.nickel <= 0.5 && this.nickel >= 0)) {
      const msg = `Nickel ${this.nickel === 0 ? 'Depleted' : 'depleted or very low'}, adjust ${this.nickelAdjustment}ml per day for ${this.nickelDays} days.`;
      this.nickelStart = msg;
    } else if (this.nickel <= 2.4 && this.nickel >= 0.6) {
      this.nickelStart = `Nickel below target level, adjust ${this.nickelAdjustment}ml per day for ${this.nickelDays} days.`;
    } else if (this.nickel <= 5 && this.nickel >= 2.6) {
      this.nickelStart = 'Nickel acceptable, slightly elevated';
    } else if (this.nickel <= 10 && this.nickel >= 5.1) {
      this.nickelStart = 'Nickel elevated above target level, allow level to settle down and watch ICP';
    } else if (this.nickel <= 50 && this.nickel >= 10.1) {
      this.nickelStart = 'Nickel level critical! Find source of pollution Preform several small water changes. 20% water change to reduce level apx 10%';
    } else {
      this.nickelStart = 'Retest parameter';
    }
  }

  sendNickelMeasurement(nickel: number) {
    this.elementMeasurementSenderService.sendMeasurement(nickel, 20);
  }

}
