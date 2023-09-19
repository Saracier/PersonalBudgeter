import { Component, Input } from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';

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
}
