import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMinorElemsTwoComponent } from './charts-minor-elems-two.component';

describe('ChartsMinorElemsTwoComponent', () => {
  let component: ChartsMinorElemsTwoComponent;
  let fixture: ComponentFixture<ChartsMinorElemsTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsMinorElemsTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsMinorElemsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
