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
      date: new Date(2023, 11, 17),
      category: 2,
      id: v4(),
    },
    {
      name: 'Buty',
      value: 300,
      date: new Date(2023, 8, 27),
      category: 6,
      id: v4(),
    },
    {
      name: 'Kredki',
      value: 20,
      date: new Date(2023, 9, 1),
      category: 7,
      id: v4(),
    },
    {
      name: 'Paliwo',
      value: 120,
      date: new Date(2023, 1, 2),
      category: 3,
      id: v4(),
    },
    {
      name: 'Kolacja z żoną',
      value: 100,
      date: new Date(2023, 0, 17),
      category: 2,
      id: v4(),
    },
    {
      name: 'Lustro',
      value: 150,
      date: new Date(2023, 2, 3),
      category: 2,
      id: v4(),
    },
    {
      name: 'Podkoszulki',
      value: 70,
      date: new Date(2023, 3, 4),
      category: 6,
      id: v4(),
    },
    {
      name: 'Korepetycje Matematyka',
      value: 50,
      date: new Date(2023, 4, 17),
      category: 7,
      id: v4(),
    },
    {
      name: 'Płyn do spryskiwaczy',
      value: 20,
      date: new Date(2023, 5, 17),
      category: 3,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 6, 17),
      category: 2,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 7, 17),
      category: 2,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 8, 17),
      category: 2,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 9, 17),
      category: 2,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 10, 17),
      category: 2,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 11, 17),
      category: 2,
      id: v4(),
    },
    {
      name: 'Subskrypcja Disney+',
      value: 40,
      date: new Date(2023, 8, 11),
      category: 2,
      id: v4(),
    },
  ];
  expenses = new BehaviorSubject(this.mockExpenses);
}
