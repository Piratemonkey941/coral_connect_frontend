import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorElemsOneComponent } from './minor-elems-one.component';

describe('MinorElemsOneComponent', () => {
  let component: MinorElemsOneComponent;
  let fixture: ComponentFixture<MinorElemsOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinorElemsOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinorElemsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
