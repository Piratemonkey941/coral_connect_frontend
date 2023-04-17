import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementMeasurementRUDComponent } from './element-measurement-rud.component';

describe('ElementMeasurementRUDComponent', () => {
  let component: ElementMeasurementRUDComponent;
  let fixture: ComponentFixture<ElementMeasurementRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementMeasurementRUDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementMeasurementRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
