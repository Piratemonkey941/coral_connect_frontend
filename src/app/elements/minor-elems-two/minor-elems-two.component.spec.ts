import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorElemsTwoComponent } from './minor-elems-two.component';

describe('MinorElemsTwoComponent', () => {
  let component: MinorElemsTwoComponent;
  let fixture: ComponentFixture<MinorElemsTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinorElemsTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinorElemsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
