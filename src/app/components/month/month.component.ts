import { Component } from '@angular/core';
import { CurrentDateService } from 'src/app/core/services/current-date.service';
import { months } from '../../interfaces/months';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent {
  currentMonth: string = 'Lipiec';
  currentMonthNumber: number = new Date().getMonth();
  currentDateSubscripction = this.CurrentDateService.shownDate.subscribe(
    (dateFromSubscripcion) => {
      this.currentMonthNumber = dateFromSubscripcion.getMonth();
    }
  );
  constructor(private CurrentDateService: CurrentDateService) {}
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
  ngOnDestroy() {
    this.currentDateSubscripction.unsubscribe();
  }
}
