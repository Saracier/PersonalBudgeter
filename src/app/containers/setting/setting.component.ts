import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  settingsForm: FormGroup;

  ngOnInit() {
    this.settingsForm = new FormGroup({
      Food: new FormControl(null, Validators.required),
      House: new FormControl(null, Validators.required),
      Transport: new FormControl(null, Validators.required),
      Telecomunication: new FormControl(null, Validators.required),
      HealthCare: new FormControl(null, Validators.required),
      Clothes: new FormControl(null, Validators.required),
      Hygiene: new FormControl(null, Validators.required),
      Entertiment: new FormControl(null, Validators.required),
      Debts: new FormControl(null, Validators.required),
      Saving: new FormControl(null, Validators.required),
      Other: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  }
}
