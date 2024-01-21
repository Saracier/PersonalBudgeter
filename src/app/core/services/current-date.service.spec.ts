import { TestBed } from '@angular/core/testing';
import { CurrentDateService } from './current-date.service';

describe('CurrentDateService', () => {
  let service: CurrentDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add one month to shownDate$', () => {
    const originalDate = new Date();
    service.shownDate$.next(originalDate);
    service.addMonth();
    const newDate = service.shownDate$.getValue();
    expect(newDate.getMonth()).toBe((originalDate.getMonth() + 1) % 12);
  });

  it('should subtract one month from shownDate$', () => {
    const originalDate = new Date();
    service.shownDate$.next(originalDate);
    service.subtractMonth();
    const newDate = service.shownDate$.getValue();
    expect(newDate.getMonth()).toBe((originalDate.getMonth() - 1 + 12) % 12);
  });

  it('should set shownDate$ to today', () => {
    service.setToday();
    const today = new Date();
    const newDate = service.shownDate$.getValue();
    expect(newDate.toDateString()).toBe(today.toDateString());
  });

  it('should trigger goToTodayCalendar', (done) => {
    service.goToTodayCalendar$.subscribe((date) => {
      expect(date).toEqual(jasmine.any(Date));
      done();
    });
    service.goToToday();
  });
});
