import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorElemsThreeComponent } from './minor-elems-three.component';

describe('MinorElemsThreeComponent', () => {
  let component: MinorElemsThreeComponent;
  let fixture: ComponentFixture<MinorElemsThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinorElemsThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinorElemsThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
