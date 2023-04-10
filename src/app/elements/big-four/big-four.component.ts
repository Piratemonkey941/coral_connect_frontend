import { Component, ElementRef, OnInit, ViewChild, Input, Output } from '@angular/core';
import { ElementCalculatorService } from '../../shared/element-calculator.service';
import { VolumeService } from '../../shared/volume.service';
import { AuthService } from '../../shared/auth.service'; // Import the authentication service
import { UserService } from 'src/app/shared/user.service'; // Import the authentication service
// import { MaterialModule } from '../../materials/materials.module'
import { ElementMeasurement, User, CreateElementMeasurement  } from '../../model';
import { ElementMeasurementsService } from '../../shared/element-measurements.service';

// import { MatButtonModule } from '@angular/material/button';
declare var window: any;

@Component({
  selector: 'app-big-four',
  templateUrl: './big-four.component.html',
  styleUrls: ['./big-four.component.scss']
})
export class BigFourComponent implements OnInit {
  formModal:any;                              // something for modal
  selectedElement: string = ''

  @Input() receivedValue: String;

  constructor(
    public volumeService: VolumeService,
    private elementMeasurementsService: ElementMeasurementsService,
    // private bigFourService: BigFourService,
    private authService: AuthService,
    private userService: UserService,
    ) { }


  ngOnInit(): void {
  // WILL NEED MODAL
  }

// MODAL CODE

    openModal(){
      this.formModal.show();
    }

    closeModal(){
      this.formModal.hide();
    }

//SALINITY

  salinityStart: string = 'The cure for anything is salt water: sweat, tears or the sea.'
  salinity: number

  onAddSalinity(){

    console.log('onAddSalinity called');

    let salinity = this.salinityStart

    if (this.salinity <= 35 && this.salinity >= 33){

        this.salinityStart = 'Salnity is acceptable'
      }
    else if ( this.salinity <= 32.9 && this.salinity >= 29 ){

      this.salinityStart = 'Salnity is lower then expected'
      }
    else if ( this.salinity <= 38  && this.salinity >= 35.1 ){

      this.salinityStart = 'Salnity is sligtly higher then expected'
     }
    else if ( this.salinity <= 45  && this.salinity >= 38.1 ){

      this.salinityStart = 'Salnity is sligtly higher then expected'
      }
    else {

      this.salinityStart = 'Retest parameter'
    }

    this.sendSalinityMeasurement(this.salinity);
  }

  sendSalinityMeasurement(salinity: number) {
    const loggedIn = this.authService.isLoggedIn();
    const currentUser = this.userService.currentUserSubject.value;
    const token = this.authService.getToken();
    console.log('Is logged in:', loggedIn, 'User:', currentUser, 'Token:', token);

    if (loggedIn) {
      console.log('User is logged in, sending salinity measurement');
      const userId = this.authService.getCurrentUserId();

      const newMeasurement: CreateElementMeasurement = {
        qt: salinity,
        reef_water_element_id: 1, // Assuming "1" is the ID for salinity in your system
        user_id: userId,
      };

      this.elementMeasurementsService.createElementMeasurement(newMeasurement).subscribe(
        (response) => {
          console.log('Salinity measurement saved:', response);
        },
        (error) => {
          console.error('Error saving salinity measurement:', error);
        }
      );
    } else {
      console.warn('User is not logged in, not sending salinity measurement');
    }
  }


  //ALKILINITY
  alkilinity: number
  alkilinityStart: string = 'Acid, harmfull to the animals stored in the vessel '

  alkilinityAdjustment: any


  onAddAlkilinity(){ // for basic calculation on card

    let alkilinity = this.alkilinityStart
    //calculation for 0.1 dkh change per volume
    this.alkilinityAdjustment = (0.1429 * this.volumeService.volume).toFixed(2) // for sodium bicarbonate lower/nuetural ph

    console.log(this.alkilinityAdjustment)

    if (this.alkilinity <= 8.5 && this.alkilinity >= 7.9){
        this.alkilinityStart = 'Ideal alkilinity for most reefs'
      }
    else if ( this.alkilinity <= 7.2 && this.alkilinity >= 6.6 ){

      this.alkilinityStart = `Alkilinity low, adjust slowly. ${this.alkilinityAdjustment}ml will increase dkh by 0.1 `
      }
    else if ( this.alkilinity <= 6.5 && this.alkilinity >= 5 ){

      this.alkilinityStart = `Alkilinity extremely low, adjust slowly. ${this.alkilinityAdjustment}ml will increase dkh by 0.1 `
      }
    else if ( this.alkilinity <= 7.8 && this.alkilinity >= 7.3 ){
      this.alkilinityStart = 'Alk slightly low usually only used in Ultra low nutrient system (ULNS)'
      }
    else if ( this.alkilinity <= 11.9  && this.alkilinity >= 8.6){

      this.alkilinityStart = 'Alk slightly higher, not usually recommended at very low nutrient levels and may wash out coral color '
     }
    else if ( this.alkilinity <= 14  && this.alkilinity >= 12 ){

      this.alkilinityStart = 'Alk slightly higher, not usually recommended at very low nutrient levels and may wash out coral color or cause bleaching '
      }
    else {
      this.alkilinityStart = 'Retest parameter'
    }
  }

  sendAlkilinityMeasurement(alkilinity: number) {
    const loggedIn = this.authService.isLoggedIn();
    const currentUser = this.userService.currentUserSubject.value;
    const token = this.authService.getToken();
    console.log('Is logged in:', loggedIn, 'User:', currentUser, 'Token:', token);

    if (loggedIn) {
      console.log('User is logged in, sending calcium measurement');
      const userId = this.authService.getCurrentUserId();

      const newMeasurement: CreateElementMeasurement = {
        qt: alkilinity,
        reef_water_element_id: 3, // Assuming "2" is the ID for calcium in your system
        user_id: userId,
      };

      this.elementMeasurementsService.createElementMeasurement(newMeasurement).subscribe(
        (response) => {
          console.log('alkilinity measurement saved:', response);
        },
        (error) => {
          console.error('Error saving alkilinity measurement:', error);
        }
      );
    } else {
      console.warn('User is not logged in, not sending alkilinity measurement');
    }
  }



  //Calcium

  calciumStart: string = 'A broken bone can heal, so can the Reef'
  calcium: number
  calciumAdjustment: any

  onAddCalcium(){

    let calcium = this.calciumStart
    this.calciumAdjustment = (0.1024 * this.volumeService.volume).toFixed(2)

    if (this.calcium <= 440 && this.calcium >= 420){

        this.calciumStart = 'Optimal calcium range. Keep up the great work!'
      }
    else if ( this.calcium <= 360 && this.calcium >= 200 ){

      this.calciumStart = `Very Low Calcium Level. Recommended to increase to 420 ppm immedietly by dosing ${this.calciumAdjustment}ml for 1ppm increase.`
      }
    else if ( this.calcium <= 400 && this.calcium >= 361 ){

      this.calciumStart = `Low Calcium Level. Recommended to increase to 420-440 ppm by dosing ${this.calciumAdjustment}ml for 1ppm increase.`
      }
    else if ( this.calcium <= 419 && this.calcium >= 401 ){

      this.calciumStart = `Acceptable Calcium Level. Recommended to increase to 420-440 ppm by dosing ${this.calciumAdjustment}ml for 1ppm increase.`
      }
    else if ( this.calcium <= 520 && this.calcium >= 441){

      this.calciumStart = 'Calcium above target. Slow Dosage to let Calcium settle down.'
     }
    else if ( this.calcium <= 600  && this.calcium >= 521 ){

      this.calciumStart = 'Calcium highly elevated! Retest water and if consistant proform water changes to reduce level.'
      }
    else {

      this.calciumStart = 'Retest parameter'
    }
  }

  sendCalciumMeasurement(calcium: number) {
    const loggedIn = this.authService.isLoggedIn();
    const currentUser = this.userService.currentUserSubject.value;
    const token = this.authService.getToken();
    console.log('Is logged in:', loggedIn, 'User:', currentUser, 'Token:', token);

    if (loggedIn) {
      console.log('User is logged in, sending calcium measurement');
      const userId = this.authService.getCurrentUserId();

      const newMeasurement: CreateElementMeasurement = {
        qt: calcium,
        reef_water_element_id: 2, //  ID for calcium in system
        user_id: userId,
      };

      this.elementMeasurementsService.createElementMeasurement(newMeasurement).subscribe(
        (response) => {
          console.log('Calcium measurement saved:', response);
        },
        (error) => {
          console.error('Error saving calcium measurement:', error);
        }
      );
    } else {
      console.warn('User is not logged in, not sending calcium measurement');
    }
  }

  //Magnesium

  magnesiumStart: string = 'Instead of becoming fireworks, Im going to make your corals glow!'
  magnesium: number
  magnesiumAdjustment: any

  onAddMagnesium(){

    let magnesium = this.magnesiumStart
    this.magnesiumAdjustment = (0.806 * this.volumeService.volume).toFixed(2)

    if (this.magnesium <= 1400 && this.magnesium >= 1300){

        this.magnesiumStart = 'magnesium is acceptable'
      }

    else if ( this.magnesium <= 1299 && this.magnesium >= 1251 ){

      this.magnesiumStart = `Magnesium is lower then expected. Correct to target of 1350 by dosing ${this.magnesiumAdjustment}ml for 10ppm increase`
      }
    else if ( this.magnesium <= 1251 && this.magnesium >= 1000 ){

      this.magnesiumStart = `Low Magnesium level. Correct to target of 1350 by dosing ${this.magnesiumAdjustment}ml for 10ppm increase.`
      }
    else if ( this.magnesium <= 1600 && this.magnesium >= 1401 ){

      this.magnesiumStart = 'Magnesium is sligtly higher then expected. Slow or stop dosing and allow level to settle down'
     }
    else if ( this.magnesium <= 2000  && this.magnesium >= 1601 ){

      this.magnesiumStart = 'magnesium is higher then expected, proform water changes to reduce level to acceptable range 1350'
      }
    else {

      this.magnesiumStart = 'Retest parameter'
    }
  }

}
