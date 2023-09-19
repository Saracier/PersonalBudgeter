import { Component, Input } from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';

@Component({
  selector: 'app-calendar-single',
  templateUrl: './calendar-single.component.html',
  styleUrls: ['./calendar-single.component.scss'],
})
export class CalendarSingleComponent {
  @Input()
  singleExpense!: IExpense;
}
