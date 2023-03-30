
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class VolumeService {


  volume: number = 100
  // volume: number
  volumeStart: string = 'Does Size Matter?'

  onAddVolume(){

    let volume = this.volume

    this.volumeStart = `Your Reef is ${volume} gallons`

    console.log(this.volume)
    return volume
  }
}
