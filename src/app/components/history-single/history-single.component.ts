import { Component, Input } from '@angular/core';
import { IExpense } from '../../interfaces/iexpense';

@Component({
  selector: 'app-history-single',
  templateUrl: './history-single.component.html',
  styleUrls: ['./history-single.component.scss'],
})
export class HistorySingleComponent {
  @Input()
  singleExpense!: IExpense;
}
