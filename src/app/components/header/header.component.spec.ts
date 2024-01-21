import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let editExpenseServiceMock: Partial<EditExpenseService>;

  beforeEach(async () => {
    editExpenseServiceMock = {
      expenseToEdit: null,
      shouldModalBeDisplayed$: new BehaviorSubject<boolean>(false),
    };

    spyOn(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      editExpenseServiceMock.shouldModalBeDisplayed$!,
      'next'
    ).and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: EditExpenseService, useValue: editExpenseServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.headerText = 'Test Header';
    component.shouldDisplayBurger = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header text', () => {
    const headerEl = fixture.debugElement.query(
      By.css('.toolbar--header h1')
    ).nativeElement;
    expect(headerEl.textContent).toContain('Test Header');
  });

  it('should emit toggleNav event when burger button is clicked', () => {
    spyOn(component.toggleNav, 'emit');
    component.shouldDisplayBurger = true;
    fixture.detectChanges();
    const burgerButton = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    ).nativeElement;
    burgerButton.click();
    expect(component.toggleNav.emit).toHaveBeenCalled();
  });

  it('should call EditExpenseService when add button is clicked', () => {
    const addButton = fixture.debugElement.query(
      By.css('.toolbar--button button')
    ).nativeElement;
    addButton.click();
    expect(
      editExpenseServiceMock?.shouldModalBeDisplayed$?.next
    ).toHaveBeenCalledWith(true);
    expect(editExpenseServiceMock.expenseToEdit).toBeNull();
  });
});
