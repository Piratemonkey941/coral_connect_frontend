import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMajorElemsComponent } from './charts-major-elems.component';

describe('ChartsMajorElemsComponent', () => {
  let component: ChartsMajorElemsComponent;
  let fixture: ComponentFixture<ChartsMajorElemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsMajorElemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsMajorElemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
