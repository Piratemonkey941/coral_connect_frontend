import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private _numCols = new BehaviorSubject<number>(3);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this._numCols.next(1);
          } else if (result.breakpoints[Breakpoints.Small]) {
            this._numCols.next(2);
          } else {
            this._numCols.next(3);
          }
        }
      });
  }

  get numCols$() {
    return this._numCols.asObservable();
  }
}
