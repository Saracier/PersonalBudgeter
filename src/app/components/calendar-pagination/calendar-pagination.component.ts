import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { CurrentDateService } from 'src/app/core/services/current-date.service';
import { PolishPaginationService } from 'src/app/core/services/polish-pagination.service';
import '@angular/localize/init';

@Component({
  selector: 'app-calendar-pagination',
  templateUrl: './calendar-pagination.component.html',
  styleUrls: ['./calendar-pagination.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PolishPaginationService }],
})
export class CalendarPaginationComponent implements OnChanges, OnInit {
  @Input()
  monthlyExpenses!: IExpense[];
  daysInMonth: number;
  displayedDays: number;
  pageSize = 3;
  @Output() updatePagination = new EventEmitter<{
    monthlyExpenses: IExpense[];
    daysInMonth: number;
    displayedDays: number;
  }>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentDateSubscripction$ =
    this.CurrentDateService.goToTodayCalendar$.subscribe(() => {
      this.goToToday();
    });

  constructor(private CurrentDateService: CurrentDateService) {}

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

  goToToday() {
    this.paginator.firstPage();
    const clicksNextPageButton = Math.floor(new Date().getDate() / 3) - 1;
    for (let i = 0; i < clicksNextPageButton; i++) {
      this.paginator.nextPage();
    }
  }

  handlePaginationEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.displayedDays = event.pageSize * event.pageIndex;
    this.updatePagination.emit({
      monthlyExpenses: this.monthlyExpenses,
      daysInMonth: this.daysInMonth,
      displayedDays: this.displayedDays,
    });
  }
}
