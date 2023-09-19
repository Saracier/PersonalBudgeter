import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentDateService } from 'src/app/core/services/current-date.service';
import { months } from '../../enums/months';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnDestroy, OnInit {
  currentMonth = 'Lipiec';
  currentMonthNumber: number = new Date().getMonth();
  currentDateSubscripction = this.CurrentDateService.shownDate.subscribe(
    (dateFromSubscripcion) => {
      this.currentMonthNumber = dateFromSubscripcion.getMonth();
    }
  );
  constructor(private CurrentDateService: CurrentDateService) {}
  ngOnInit() {
    this.updateMonth();
  }

  subtractMonth() {
    this.CurrentDateService.subtractMonth();
    this.updateMonth();
  }

  addMonth() {
    this.CurrentDateService.addMonth();
    this.updateMonth();
  }

  updateMonth() {
    this.currentMonth = months[this.currentMonthNumber];
  }

  setToday() {
    this.CurrentDateService.setToday();
    this.updateMonth();
  }

  ngOnDestroy() {
    this.currentDateSubscripction.unsubscribe();
  }
}
