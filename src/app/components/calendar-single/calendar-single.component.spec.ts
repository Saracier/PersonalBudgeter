import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSingleComponent } from './calendar-single.component';

describe('CalendarSingleComponent', () => {
  let component: CalendarSingleComponent;
  let fixture: ComponentFixture<CalendarSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarSingleComponent]
    });
    fixture = TestBed.createComponent(CalendarSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
