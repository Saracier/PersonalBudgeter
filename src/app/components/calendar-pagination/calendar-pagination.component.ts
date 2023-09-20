import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-calendar-pagination',
  templateUrl: './calendar-pagination.component.html',
  styleUrls: ['./calendar-pagination.component.scss'],
})
export class CalendarPaginationComponent implements OnChanges, OnInit {
  @Input()
  monthlyExpenses!: IExpense[];
  daysInMonth: number;
  displayedDays: number;
  @Output() updatePagination = new EventEmitter<{
    monthlyExpenses: IExpense[];
    daysInMonth: number;
    displayedDays: number;
  }>();
  // currentDateSubscripction = this.CurrentDateService.shownDate.subscribe(() => {
  //   setTimeout(() => {
  //     this.handlePaginationEvent();
  //   }, 100);
  // });

  ngOnInit() {
    this.updateDaysInMonth();
    this.handlePaginationEvent({
      length: this.daysInMonth,
      pageIndex: 0,
      pageSize: 3,
      previousPageIndex: 1,
    });
  }

  ngOnChanges() {
    this.updateDaysInMonth();
  }

  updateDaysInMonth() {
    if (this.monthlyExpenses.length === 0) {
      this.daysInMonth === 0;
      return;
    }
    this.daysInMonth = getDaysInMonth(this.monthlyExpenses[0].date);
  }

  handlePaginationEvent(event?: PageEvent) {
    if (event) {
      this.displayedDays = event.pageSize * event.pageIndex;
    }
    this.updatePagination.emit({
      monthlyExpenses: this.monthlyExpenses,
      daysInMonth: this.daysInMonth,
      displayedDays: this.displayedDays,
    });
  }

  // ngOnDestroy() {
  //   this.currentDateSubscripction.unsubscribe();
  // }
}
