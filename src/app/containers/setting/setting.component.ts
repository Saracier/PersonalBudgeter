import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpencesSettingsService } from 'src/app/core/services/expenses-settings.service';
import { Category } from 'src/app/enums/category';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, OnDestroy {
  mapEngToPl: Record<string, string> = {
    House: 'Dom',
    Transport: 'Transport',
    Telecomunication: 'Telekomunikacja',
    HealthCare: 'Opieka zdrowotna',
    Clothes: 'Ubrania',
    Debts: 'Spłata zadłużeń',
    Entertiment: 'Rozrywka',
    Food: 'Jedzenie',
    Hygiene: 'Higiena',
    Kids: 'Dzieci',
    Other: 'Inne',
    Saving: 'Oszczędności',
  };
  categoryEnum = Object.keys(Category);
  settingsForm: FormGroup;
  expensesSettingsSubscripction =
    this.ExpencesSettingsService.expensesSettings.subscribe(
      (expensesSettings) => (this.expensesSettings = expensesSettings)
    );
  expensesSettings = this.ExpencesSettingsService.mockExpensesSettings;
  hasBeenSaved = false;

  constructor(private ExpencesSettingsService: ExpencesSettingsService) {}

  ngOnInit() {
    this.settingsForm = new FormGroup({
      Food: new FormControl(this.expensesSettings.Food, Validators.required),
      House: new FormControl(this.expensesSettings.House, Validators.required),
      Transport: new FormControl(
        this.expensesSettings.Transport,
        Validators.required
      ),
      Telecomunication: new FormControl(
        this.expensesSettings.Telecomunication,
        Validators.required
      ),
      HealthCare: new FormControl(
        this.expensesSettings.HealthCare,
        Validators.required
      ),
      Clothes: new FormControl(
        this.expensesSettings.Clothes,
        Validators.required
      ),
      Hygiene: new FormControl(
        this.expensesSettings.Hygiene,
        Validators.required
      ),
      Kids: new FormControl(this.expensesSettings.Kids, Validators.required),
      Entertiment: new FormControl(
        this.expensesSettings.Entertiment,
        Validators.required
      ),
      Debts: new FormControl(this.expensesSettings.Debts, Validators.required),
      Saving: new FormControl(
        this.expensesSettings.Saving,
        Validators.required
      ),
      Other: new FormControl(this.expensesSettings.Other, Validators.required),
    });
  }

  ngOnDestroy() {
    this.expensesSettingsSubscripction.unsubscribe();
  }

  onSubmit() {
    this.ExpencesSettingsService.expensesSettings.next({
      Food: this.settingsForm.value.Food,
      House: this.settingsForm.value.House,
      Transport: this.settingsForm.value.Transport,
      Telecomunication: this.settingsForm.value.Telecomunication,
      HealthCare: this.settingsForm.value.HealthCare,
      Clothes: this.settingsForm.value.Clothes,
      Hygiene: this.settingsForm.value.Hygiene,
      Kids: this.settingsForm.value.Kids,
      Entertiment: this.settingsForm.value.Entertiment,
      Debts: this.settingsForm.value.Debts,
      Saving: this.settingsForm.value.Saving,
      Other: this.settingsForm.value.Other,
    });
    this.changeHasBeenSavedFlag();
  }

  changeHasBeenSavedFlag() {
    this.hasBeenSaved = true;
    setTimeout(() => {
      this.hasBeenSaved = false;
    }, 3000);
  }
}
