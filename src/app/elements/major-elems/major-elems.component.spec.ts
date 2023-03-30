import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorElemsComponent } from './major-elems.component';

describe('MajorElemsComponent', () => {
  let component: MajorElemsComponent;
  let fixture: ComponentFixture<MajorElemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorElemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorElemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
