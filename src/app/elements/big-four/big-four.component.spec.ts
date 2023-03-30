import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigFourComponent } from './big-four.component';

describe('BigFourComponent', () => {
  let component: BigFourComponent;
  let fixture: ComponentFixture<BigFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
