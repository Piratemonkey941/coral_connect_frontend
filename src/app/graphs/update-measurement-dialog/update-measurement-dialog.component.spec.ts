import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeasurementDialogComponent } from './update-measurement-dialog.component';

describe('UpdateMeasurementDialogComponent', () => {
  let component: UpdateMeasurementDialogComponent;
  let fixture: ComponentFixture<UpdateMeasurementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMeasurementDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMeasurementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
