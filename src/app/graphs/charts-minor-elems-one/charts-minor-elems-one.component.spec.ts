import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMinorElemsOneComponent } from './charts-minor-elems-one.component';

describe('ChartsMinorElemsOneComponent', () => {
  let component: ChartsMinorElemsOneComponent;
  let fixture: ComponentFixture<ChartsMinorElemsOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsMinorElemsOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsMinorElemsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
