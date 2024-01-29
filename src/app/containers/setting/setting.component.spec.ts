import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingComponent } from './setting.component';
import { ExpencesSettingsService } from 'src/app/core/services/expences-settings.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;
  let expencesSettingsServiceMock: Partial<ExpencesSettingsService>;

  beforeEach(async () => {
    const mockExpensesSettings = {
      Food: 400,
      House: 1100,
      Transport: 300,
      Telecomunication: 100,
      HealthCare: 100,
      Clothes: 250,
      Hygiene: 100,
      Kids: 300,
      Entertiment: 300,
      Debts: 400,
      Saving: 1500,
      Other: 400,
    };
    expencesSettingsServiceMock = {
      mockExpensesSettings: mockExpensesSettings,
      expensesSettings$: new BehaviorSubject(mockExpensesSettings),
    };

    spyOn(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expencesSettingsServiceMock.expensesSettings$!,
      'next'
    ).and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [SettingComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ExpencesSettingsService,
          useValue: expencesSettingsServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data from service', () => {
    expect(component.settingsForm.value).toEqual(
      expencesSettingsServiceMock.mockExpensesSettings
    );
  });

  it('should disable submit button when form is invalid', () => {
    component.settingsForm.controls['Food'].setValue('');
    fixture.detectChanges();
    const submitButton =
      fixture.debugElement.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should call service method to update settings on submit', () => {
    component.onSubmit();
    expect(
      expencesSettingsServiceMock?.expensesSettings$?.next
    ).toHaveBeenCalled();
  });

  it('should unsubscribe from expensesSettingsSubscripction$ on ngOnDestroy', () => {
    spyOn(component.expensesSettingsSubscripction$, 'unsubscribe');
    component.ngOnDestroy();
    expect(
      component.expensesSettingsSubscripction$.unsubscribe
    ).toHaveBeenCalled();
  });
});
