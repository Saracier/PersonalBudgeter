import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IExpense } from 'src/app/interfaces/iexpense';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  mockExpenses: IExpense[] = [
    {
      name: 'Czynsz',
      value: 1000,
      date: new Date(),
      category: 2,
      id: v4(),
    },
    { name: 'Buty', value: 300, date: new Date(), category: 6, id: v4() },
    { name: 'Kredki', value: 20, date: new Date(), category: 7, id: v4() },
    {
      name: 'Paliwo',
      value: 120,
      date: new Date(),
      category: 3,
      id: v4(),
    },
    {
      name: 'Kolacja z żoną',
      value: 100,
      date: new Date(),
      category: 2,
      id: v4(),
    },
    {
      name: 'Lustro',
      value: 150,
      date: new Date(),
      category: 2,
      id: v4(),
    },
    {
      name: 'Podkoszulki',
      value: 70,
      date: new Date(),
      category: 6,
      id: v4(),
    },
    {
      name: 'Korepetycje Matematyka',
      value: 50,
      date: new Date(),
      category: 7,
      id: v4(),
    },
    {
      name: 'Płyn do spryskiwaczy',
      value: 20,
      date: new Date(),
      category: 3,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(),
      category: 2,
      id: v4(),
    },
  ];
  expenses = new BehaviorSubject(this.mockExpenses);
}
