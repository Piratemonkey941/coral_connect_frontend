import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMinorElemsThreeComponent } from './charts-minor-elems-three.component';

describe('ChartsMinorElemsThreeComponent', () => {
  let component: ChartsMinorElemsThreeComponent;
  let fixture: ComponentFixture<ChartsMinorElemsThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsMinorElemsThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsMinorElemsThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
