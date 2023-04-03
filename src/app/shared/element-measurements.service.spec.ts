import { TestBed } from '@angular/core/testing';

import { ElementMeasurementsService } from './element-measurements.service';

describe('ElementMeasurementsService', () => {
  let service: ElementMeasurementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementMeasurementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
