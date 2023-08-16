import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgeterComponent } from './budgeter.component';

describe('BudgeterComponent', () => {
  let component: BudgeterComponent;
  let fixture: ComponentFixture<BudgeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgeterComponent]
    });
    fixture = TestBed.createComponent(BudgeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
