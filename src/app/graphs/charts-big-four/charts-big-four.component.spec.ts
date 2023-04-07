import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsBigFourComponent } from './charts-big-four.component';

describe('ChartsBigFourComponent', () => {
  let component: ChartsBigFourComponent;
  let fixture: ComponentFixture<ChartsBigFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsBigFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsBigFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
