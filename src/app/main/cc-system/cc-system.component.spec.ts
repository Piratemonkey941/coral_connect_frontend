import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSystemComponent } from './cc-system.component';

describe('CcSystemComponent', () => {
  let component: CcSystemComponent;
  let fixture: ComponentFixture<CcSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
