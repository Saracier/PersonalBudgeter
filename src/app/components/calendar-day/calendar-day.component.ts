import { Component, Input } from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';
import { months } from 'src/app/enums/months';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent {
  @Input()
  displayedDays!: number;
  @Input()
  monthlyExpenses!: IExpense[];
  @Input() wantedMonth: number;
  months = months;
}
