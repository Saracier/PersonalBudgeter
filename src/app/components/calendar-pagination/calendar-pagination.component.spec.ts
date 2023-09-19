import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPaginationComponent } from './calendar-pagination.component';

describe('CalendarPaginationComponent', () => {
  let component: CalendarPaginationComponent;
  let fixture: ComponentFixture<CalendarPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarPaginationComponent]
    });
    fixture = TestBed.createComponent(CalendarPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
