import { TestBed } from '@angular/core/testing';

import { ElementCalculatorService } from './element-calculator.service';

describe('ElementCalculatorService', () => {
  let service: ElementCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
