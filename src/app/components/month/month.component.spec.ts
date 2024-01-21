import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthComponent } from './month.component';
import { CurrentDateService } from 'src/app/core/services/current-date.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;
  let currentDateServiceMock: Partial<CurrentDateService>;
  let routerMock: Partial<Router>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let shownDateSubject$: Subject<Date>;

  beforeEach(async () => {
    shownDateSubject$ = new Subject<Date>();
    currentDateServiceMock = {
      shownDate$: new BehaviorSubject(new Date('07.07.2023')),
      subtractMonth: jasmine.createSpy('subtractMonth'),
      addMonth: jasmine.createSpy('addMonth'),
      setToday: jasmine.createSpy('setToday'),
      goToToday: jasmine.createSpy('goToToday'),
    };
    routerMock = { url: '/' };

    await TestBed.configureTestingModule({
      declarations: [MonthComponent],
      providers: [
        { provide: CurrentDateService, useValue: currentDateServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current month', () => {
    const monthNameEl = fixture.debugElement.query(
      By.css('.month--name')
    ).nativeElement;
    expect(monthNameEl.textContent).toContain('Lipiec');
  });

  it('should call subtractMonth and updateMonth when left arrow is clicked', () => {
    spyOn(component, 'updateMonth');
    const leftArrowButton = fixture.debugElement.query(
      By.css('button[mat-icon-button]:first-child')
    ).nativeElement;
    leftArrowButton.click();
    expect(currentDateServiceMock.subtractMonth).toHaveBeenCalled();
    expect(component.updateMonth).toHaveBeenCalled();
  });

  it('should unsubscribe from currentDateSubscripction on ngOnDestroy', () => {
    spyOn(component.currentDateSubscripction$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.currentDateSubscripction$.unsubscribe).toHaveBeenCalled();
  });
});
