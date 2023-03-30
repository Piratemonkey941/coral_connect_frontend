import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementCalculatorService {

  constructor() { }

  alkinityCalculator(
    alkilinityDesired: any,
    alkilinityCurrent: any,
    additiveSelectedDefault: any,
    volume: any,
    alkOptionText: any
    )
    { // logic here

    const alkilinityChange = (alkilinityDesired - alkilinityCurrent) * 10
    let
      alkilinityAdjustment: any = 0,
      alkilinityResult: any = 0,
      alkilinityResultWithString: any = ''

    if (additiveSelectedDefault === '1')  // sodium bicarb logic here
    {

      alkilinityAdjustment = (0.1429 * volume) // for sodium bicarbonate lower/nuetural ph
      alkilinityResult = (alkilinityChange * alkilinityAdjustment).toFixed(2)

      // return alkilinityResult
       alkilinityResultWithString =  " Dose " + alkilinityResult + " milliLiters "

      return alkilinityResultWithString
    }
     else if( additiveSelectedDefault === '2')
    {
      alkilinityAdjustment = (0.0714 * volume) // for soda ash higher ph
       alkilinityResult = (alkilinityChange * alkilinityAdjustment).toFixed(2)
      //  console.log('volume', this.volume)
      // return alkilinityResult
         alkilinityResultWithString =  " Dose " + alkilinityResult + " milliLiters "

      return alkilinityResultWithString
    }
    else if (additiveSelectedDefault === '3' ){
      alkilinityAdjustment = (3.322 * volume) // for Kalkwasser higher ph
       alkilinityResult = (alkilinityChange * alkilinityAdjustment).toFixed(2)

      // return alkilinityResult
      alkilinityResultWithString =  " Dose " + alkilinityResult + " milliLiters "

      return alkilinityResultWithString
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
    volume: any
    )
    { // logic here

    let
      calciumAdjustment: any = 0,
      calciumResult: any = 0
    const calciumChange = calciumDesired - calciumCurrent

    calciumAdjustment = (0.1023 * volume) // for liquid calcium cloride
    return calciumResult = (calciumChange * calciumAdjustment).toFixed(2)

  }

   //  MAGNESIUM CALCULATOR ================================================================================

magnesiumCalculator(
    magnesiumDesired: any,
    magnesiumCurrent: any,
    additiveSelectedDefault: any,
    volume: any
    )
    { // logic here

    const magnesiumChange = magnesiumDesired - magnesiumCurrent
    let
      magnesiumAdjustment: any = 0,
      magnesiumResult: any = 0,
      magnesiumResultWithString: any = ''


    if (additiveSelectedDefault === '1')  // sodium bicarb logic here
    {

      magnesiumAdjustment = (0.08065 * volume) // for liquid magnesium mix BRS
      magnesiumResult = (magnesiumChange * magnesiumAdjustment).toFixed(2)
      magnesiumResultWithString =  " Dose " + magnesiumResult + "milliLiters"

      return magnesiumResultWithString
      // return magnesiumResult
    }
     else if( additiveSelectedDefault === '2')
    {
      magnesiumAdjustment = (0.03156 * volume) //  for dry magnesium cloride mix
       magnesiumResult = (magnesiumChange * magnesiumAdjustment).toFixed(2)
      //  console.log('volume', this.volume)
      magnesiumResultWithString =  " Dose " + magnesiumResult + "grams"

       return magnesiumResultWithString
      // return magnesiumResult
    }
    else if (additiveSelectedDefault === '3' ){
      magnesiumAdjustment = (0.01823 * volume) //  for dry magnesium sulfite mix
       magnesiumResult = (magnesiumChange * magnesiumAdjustment).toFixed(2)

      magnesiumResultWithString =  " Dose " + magnesiumResult + "grams"

       return magnesiumResultWithString
      // return magnesiumResult
      }
    else {
        return 'Please complete form'
      }

  }
}
