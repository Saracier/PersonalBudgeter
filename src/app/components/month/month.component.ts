import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentDateService } from 'src/app/core/services/current-date.service';
import { months } from '../../enums/months';
import { Router } from '@angular/router';

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
  constructor(
    private CurrentDateService: CurrentDateService,
    private router: Router
  ) {}
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
    if (this.router.url === '/') {
      this.CurrentDateService.goToToday();
    }
  }

  ngOnDestroy() {
    this.currentDateSubscripction.unsubscribe();
  }
}
