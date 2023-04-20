import { Injectable } from '@angular/core';
import { VolumeService } from 'src/app/shared/volume.service';

@Injectable({
  providedIn: 'root'
})
export class ElementCalculatorService {

  constructor(public volumeService: VolumeService,) { }

  alkinityCalculator(
    alkalinityDesired: any,
    alkalinityCurrent: any,
    additiveSelectedDefault: any,
    // volume: any,
    alkOptionText: any
    )
    { // logic here

    const alkalinityChange = (alkalinityDesired - alkalinityCurrent) * 10
    let
      alkalinityAdjustment: any = 0,
      alkalinityResult: any = 0,
      alkalinityResultWithString: any = ''

    if (additiveSelectedDefault === '1')  // sodium bicarb logic here
    {

      alkalinityAdjustment = (0.1429 * this.volumeService.volume) // for sodium bicarbonate lower/nuetural ph
      alkalinityResult = (alkalinityChange * alkalinityAdjustment).toFixed(2)

      // return alkalinityResult
       alkalinityResultWithString =  " Dose " + alkalinityResult + " milliLiters "

      return alkalinityResultWithString
    }
     else if( additiveSelectedDefault === '2')
    {
      alkalinityAdjustment = (0.0714 * this.volumeService.volume) // for soda ash higher ph
       alkalinityResult = (alkalinityChange * alkalinityAdjustment).toFixed(2)
      //  // console.log('volume', this.volume)
      // return alkalinityResult
         alkalinityResultWithString =  " Dose " + alkalinityResult + " milliLiters "

      return alkalinityResultWithString
    }
    else if (additiveSelectedDefault === '3' ){
      alkalinityAdjustment = (3.322 * this.volumeService.volume) // for Kalkwasser higher ph
       alkalinityResult = (alkalinityChange * alkalinityAdjustment).toFixed(2)

      // return alkalinityResult
      alkalinityResultWithString = alkalinityResult

      return alkalinityResultWithString
      }
    else {
        return 'Please complete form'
      }

  }

  //  CALCIUM CALCULATOR ================================================================================

  calciumCalculator(
    calciumDesired: any,
    calciumCurrent: any,
    // additiveSelectedDefault,
    // volume: any
    )
    { // logic here

    let
      calciumAdjustment: any = 0,
      calciumResult: any = 0
    const calciumChange = calciumDesired - calciumCurrent

    calciumAdjustment = (0.1023 * this.volumeService.volume) // for liquid calcium cloride
    return calciumResult = (calciumChange * calciumAdjustment).toFixed(2)

  }

   //  MAGNESIUM CALCULATOR ================================================================================

magnesiumCalculator(
    magnesiumDesired: any,
    magnesiumCurrent: any,
    additiveSelectedDefault: any,
    // volume: any
    )
    { // logic here

    const magnesiumChange = magnesiumDesired - magnesiumCurrent
    let
      magnesiumAdjustment: any = 0,
      magnesiumResult: any = 0,
      magnesiumResultWithString: any = ''


    if (additiveSelectedDefault === '1')  // sodium bicarb logic here
    {

      magnesiumAdjustment = (0.08065 * this.volumeService.volume) // for liquid magnesium mix BRS
      magnesiumResult = (magnesiumChange * magnesiumAdjustment).toFixed(2)
      magnesiumResultWithString = magnesiumResult

      return magnesiumResultWithString
      // return magnesiumResult
    }
     else if( additiveSelectedDefault === '2')
    {
      magnesiumAdjustment = (0.03156 * this.volumeService.volume) //  for dry magnesium cloride mix
       magnesiumResult = (magnesiumChange * magnesiumAdjustment).toFixed(2)
      //  // console.log('volume', this.volume)
      magnesiumResultWithString = magnesiumResult

       return magnesiumResultWithString
      // return magnesiumResult
    }
    else if (additiveSelectedDefault === '3' ){
      magnesiumAdjustment = (0.01823 * this.volumeService.volume) //  for dry magnesium sulfite mix
       magnesiumResult = (magnesiumChange * magnesiumAdjustment).toFixed(2)

      magnesiumResultWithString = magnesiumResult

       return magnesiumResultWithString
      // return magnesiumResult
      }
    else {
        return 'Please complete form'
      }

  }
}
