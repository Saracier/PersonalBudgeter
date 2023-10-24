import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { IExpense } from 'src/app/interfaces/iexpense';
import { Category } from 'src/app/enums/category';
import { v4 } from 'uuid';
import { CurrentDateService } from './current-date.service';
import { ExpencesSettingsService } from '../services/expenses-settings.service';
import subMonths from 'date-fns/subMonths';
import getDaysInMonth from 'date-fns/getDaysInMonth';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  mockExpenses: IExpense[] = [
    {
      name: 'Czynsz',
      value: 1000,
      date: new Date(2023, 11, 17),
      category: Category.House,
      id: v4(),
    },
    {
      name: 'Buty',
      value: 300,
      date: new Date(2023, 8, 27),
      category: Category.House,
      id: v4(),
    },
    {
      name: 'Kredki',
      value: 20,
      date: new Date(2023, 9, 1),
      category: Category.Kids,
      id: v4(),
    },
    {
      name: 'Paliwo',
      value: 120,
      date: new Date(2023, 1, 2),
      category: Category.Transport,
      id: v4(),
    },
    {
      name: 'Kolacja z żoną',
      value: 100,
      date: new Date(2023, 0, 17),
      category: Category.Entertiment,
      id: v4(),
    },
    {
      name: 'Lustro',
      value: 150,
      date: new Date(2023, 2, 3),
      category: Category.House,
      id: v4(),
    },
    {
      name: 'Podkoszulki',
      value: 70,
      date: new Date(2023, 3, 4),
      category: Category.Clothes,
      id: v4(),
    },
    {
      name: 'Korepetycje Matematyka',
      value: 50,
      date: new Date(2023, 4, 17),
      category: Category.Kids,
      id: v4(),
    },
    {
      name: 'Płyn do spryskiwaczy',
      value: 20,
      date: new Date(2023, 5, 17),
      category: Category.Transport,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 6, 17),
      category: Category.Entertiment,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 7, 17),
      category: Category.Entertiment,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 8, 17),
      category: Category.Entertiment,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 9, 17),
      category: Category.Entertiment,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 10, 17),
      category: Category.Entertiment,
      id: v4(),
    },
    {
      name: 'Subskrypcja Netflix',
      value: 100,
      date: new Date(2023, 11, 17),
      category: Category.Entertiment,
      id: v4(),
    },
    {
      name: 'Subskrypcja Disney+',
      value: 40,
      date: new Date(2023, 8, 11),
      category: Category.Entertiment,
      id: v4(),
    },
    {
      name: 'Zeszyt do matematyki',
      value: 13,
      date: new Date(2023, 8, 2),
      category: Category.Kids,
      id: v4(),
    },
    {
      name: 'Tankowanie auta',
      value: 150,
      date: new Date(2023, 8, 2),
      category: Category.Transport,
      id: v4(),
    },
    {
      name: 'Filtry do wody DAFI',
      value: 23.99,
      date: new Date(2023, 9, 21),
      category: Category.Food,
      id: v4(),
    },
    {
      name: 'Filtry do wody DAFI',
      value: 23.99,
      date: new Date(2023, 10, 21),
      category: Category.Food,
      id: v4(),
    },
    {
      name: 'Filtry do wody DAFI',
      value: 23.99,
      date: new Date(2023, 11, 21),
      category: Category.Food,
      id: v4(),
    },
  ];
  expenses = new BehaviorSubject(this.mockExpenses);
  mockExpensesSource: IExpense[][] = [
    [
      {
        name: 'Filtry do wody DAFI',
        value: 24,
        date: new Date(),
        category: Category.Food,
        id: v4(),
      },
      {
        name: 'Zakupy Biedronka',
        value: 47,
        date: new Date(),
        category: Category.Food,
        id: v4(),
      },
      {
        name: 'Zakupy Lidl',
        value: 51,
        date: new Date(),
        category: Category.Food,
        id: v4(),
      },
      {
        name: 'Bułki',
        value: 7,
        date: new Date(),
        category: Category.Food,
        id: v4(),
      },
      {
        name: 'cola',
        value: 5,
        date: new Date(),
        category: Category.Food,
        id: v4(),
      },
    ],
    [
      {
        name: 'Lustro',
        value: 100,
        date: new Date(),
        category: Category.House,
        id: v4(),
      },
      {
        name: 'Czynsz',
        value: 700,
        date: new Date(),
        category: Category.House,
        id: v4(),
      },
      {
        name: 'Prąd',
        value: 120,
        date: new Date(),
        category: Category.House,
        id: v4(),
      },
      {
        name: 'Ręczniki',
        value: 20,
        date: new Date(),
        category: Category.House,
        id: v4(),
      },
      {
        name: 'Poduszka',
        value: 70,
        date: new Date(),
        category: Category.House,
        id: v4(),
      },
    ],
    [
      {
        name: 'Płyn do spryskiwaczy',
        value: 20,
        date: new Date(),
        category: Category.Transport,
        id: v4(),
      },
      {
        name: 'Tankowanie auta',
        value: 70,
        date: new Date(),
        category: Category.Transport,
        id: v4(),
      },
      {
        name: 'Olej',
        value: 20,
        date: new Date(),
        category: Category.Transport,
        id: v4(),
      },
      {
        name: 'Przegląd',
        value: 110,
        date: new Date(),
        category: Category.Transport,
        id: v4(),
      },
      {
        name: 'Żarówka',
        value: 10,
        date: new Date(),
        category: Category.Transport,
        id: v4(),
      },
    ],
    [
      {
        name: 'Internet',
        value: 30,
        date: new Date(),
        category: Category.Telecomunication,
        id: v4(),
      },
      {
        name: 'Doładowanie konta Play',
        value: 30,
        date: new Date(),
        category: Category.Telecomunication,
        id: v4(),
      },
      {
        name: 'Doładowanie konta Plus',
        value: 30,
        date: new Date(),
        category: Category.Telecomunication,
        id: v4(),
      },
      {
        name: 'Pakiet internetu',
        value: 5,
        date: new Date(),
        category: Category.Telecomunication,
        id: v4(),
      },
      {
        name: 'Pakiet sms',
        value: 5,
        date: new Date(),
        category: Category.Telecomunication,
        id: v4(),
      },
    ],
    [
      {
        name: 'Witamina C',
        value: 5,
        date: new Date(),
        category: Category.HealthCare,
        id: v4(),
      },
      {
        name: 'Leki astma',
        value: 15,
        date: new Date(),
        category: Category.HealthCare,
        id: v4(),
      },
      {
        name: 'Multiwitamina',
        value: 5,
        date: new Date(),
        category: Category.HealthCare,
        id: v4(),
      },
      {
        name: 'Krople do oczu',
        value: 12,
        date: new Date(),
        category: Category.HealthCare,
        id: v4(),
      },
      {
        name: 'Pakiet Medicover z pracy',
        value: 15,
        date: new Date(),
        category: Category.HealthCare,
        id: v4(),
      },
    ],
    [
      {
        name: 'Buty Kasi',
        value: 70,
        date: new Date(),
        category: Category.Clothes,
        id: v4(),
      },
      {
        name: 'Spodnie',
        value: 70,
        date: new Date(),
        category: Category.Clothes,
        id: v4(),
      },
      {
        name: 'Skarpetki',
        value: 10,
        date: new Date(),
        category: Category.Clothes,
        id: v4(),
      },
      {
        name: 'Bielizna',
        value: 15,
        date: new Date(),
        category: Category.Clothes,
        id: v4(),
      },
      {
        name: 'Okulary przeciwsłoneczne',
        value: 20,
        date: new Date(),
        category: Category.Clothes,
        id: v4(),
      },
    ],
    [
      {
        name: 'Pasta do zębów',
        value: 7,
        date: new Date(),
        category: Category.Hygiene,
        id: v4(),
      },
      {
        name: 'Nić dentystyczna',
        value: 5,
        date: new Date(),
        category: Category.Hygiene,
        id: v4(),
      },
      {
        name: 'Szczoteczka do zębów',
        value: 10,
        date: new Date(),
        category: Category.Hygiene,
        id: v4(),
      },
      {
        name: 'Płyn do kąpieli',
        value: 10,
        date: new Date(),
        category: Category.Hygiene,
        id: v4(),
      },
      {
        name: 'Golarka',
        value: 12,
        date: new Date(),
        category: Category.Hygiene,
        id: v4(),
      },
    ],
    [
      {
        name: 'Zeszyt',
        value: 13,
        date: new Date(),
        category: Category.Kids,
        id: v4(),
      },
      {
        name: 'Pluszak',
        value: 50,
        date: new Date(),
        category: Category.Kids,
        id: v4(),
      },
      {
        name: 'Kieszonkowe',
        value: 50,
        date: new Date(),
        category: Category.Kids,
        id: v4(),
      },
      {
        name: 'Korepetycje',
        value: 50,
        date: new Date(),
        category: Category.Kids,
        id: v4(),
      },
      {
        name: 'Na wycieczkę szkolną',
        value: 40,
        date: new Date(),
        category: Category.Kids,
        id: v4(),
      },
    ],
    [
      {
        name: 'Mikrotransakcje grze',
        value: 20,
        date: new Date(),
        category: Category.Entertiment,
        id: v4(),
      },
      {
        name: 'Subskrypcja VOD',
        value: 40,
        date: new Date(),
        category: Category.Entertiment,
        id: v4(),
      },
      {
        name: 'Kino',
        value: 40,
        date: new Date(),
        category: Category.Entertiment,
        id: v4(),
      },
      {
        name: 'Kolacja z Kasią',
        value: 60,
        date: new Date(),
        category: Category.Entertiment,
        id: v4(),
      },
      {
        name: 'Basen',
        value: 20,
        date: new Date(),
        category: Category.Entertiment,
        id: v4(),
      },
    ],
    [
      {
        name: 'Rata MediaExpert',
        value: 200,
        date: new Date(),
        category: Category.Debts,
        id: v4(),
      },
      {
        name: 'Rata Empik',
        value: 200,
        date: new Date(),
        category: Category.Debts,
        id: v4(),
      },
      {
        name: 'Rata Media Markt',
        value: 200,
        date: new Date(),
        category: Category.Debts,
        id: v4(),
      },
      {
        name: 'Rata Allegro',
        value: 200,
        date: new Date(),
        category: Category.Debts,
        id: v4(),
      },
      {
        name: 'Rata Samochód',
        value: 200,
        date: new Date(),
        category: Category.Debts,
        id: v4(),
      },
    ],
    [
      {
        name: 'Konto oszczędnościowe',
        value: 200,
        date: new Date(),
        category: Category.Saving,
        id: v4(),
      },
      {
        name: 'ETF akumulujące',
        value: 200,
        date: new Date(),
        category: Category.Saving,
        id: v4(),
      },
      {
        name: 'ETF Dystrybucyjne',
        value: 200,
        date: new Date(),
        category: Category.Saving,
        id: v4(),
      },
      {
        name: 'Złoto',
        value: 200,
        date: new Date(),
        category: Category.Saving,
        id: v4(),
      },
      {
        name: 'Obligacje Skarbowe',
        value: 200,
        date: new Date(),
        category: Category.Saving,
        id: v4(),
      },
    ],
    [
      {
        name: 'Prezent urodzinowy',
        value: 200,
        date: new Date(),
        category: Category.Other,
        id: v4(),
      },
      {
        name: 'Koperta wesele',
        value: 200,
        date: new Date(),
        category: Category.Other,
        id: v4(),
      },
      {
        name: 'Dogadanie się po kolizji',
        value: 150,
        date: new Date(),
        category: Category.Other,
        id: v4(),
      },
      {
        name: 'Mandat',
        value: 200,
        date: new Date(),
        category: Category.Other,
        id: v4(),
      },
      {
        name: 'Zgubiony portfel',
        value: 200,
        date: new Date(),
        category: Category.Other,
        id: v4(),
      },
    ],
  ];

  constructor(
    private currentDateService: CurrentDateService,
    private ExpencesSettingsService: ExpencesSettingsService
  ) {
    this.prepareMockExpenses();
  }

  generateRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  prepareSingleCategory(
    valueOfCategory: number,
    indexCategory: number,
    date: Date
  ) {
    let expensesSingleCategory: IExpense[] = [];
    let valueOfCategoryCopy = valueOfCategory;
    while (valueOfCategoryCopy >= 0) {
      const expenseForThisIteration = Object.assign(
        {},
        this.mockExpensesSource[indexCategory][
          Math.floor(
            Math.random() * this.mockExpensesSource[indexCategory].length
          )
        ]
      );
      const dayExpense = this.generateRandomNumber(1, getDaysInMonth(date));
      const newDateExpense = new Date(
        date.getFullYear(),
        date.getMonth(),
        dayExpense
      );

      expenseForThisIteration.date = newDateExpense;
      expenseForThisIteration.id = v4();

      valueOfCategoryCopy = valueOfCategoryCopy - expenseForThisIteration.value;

      if (valueOfCategoryCopy < 0) continue;

      expensesSingleCategory.push(expenseForThisIteration);
    }

    if (date.getMonth() === new Date().getMonth()) {
      expensesSingleCategory = expensesSingleCategory.filter(
        (signleExpense) => {
          if (signleExpense.date.getDate() > new Date().getDate()) {
            return false;
          }
          return true;
        }
      );
    }

    return expensesSingleCategory;
  }

  prepareMockExpenses() {
    const resultArray: IExpense[] = [];
    const settingsValues: number[] = Object.values(
      this.ExpencesSettingsService.mockExpensesSettings
    );
    for (let i = 0; i < 3; i++) {
      let monthForThisIteration = new Date().getMonth();
      if (i > 0) {
        monthForThisIteration = subMonths(new Date(), i).getMonth();
      }
      const yearForThisIteration = subMonths(new Date(), i).getFullYear();
      const dateForThisIteration = new Date(
        yearForThisIteration,
        monthForThisIteration,
        1
      );
      settingsValues.forEach((element, index) => {
        resultArray.push(
          ...this.prepareSingleCategory(element, index, dateForThisIteration)
        );
      });
    }
    this.expenses.next(resultArray);
  }

  filterExpenses() {
    return combineLatest([
      this.expenses.asObservable(),
      this.currentDateService.shownDate.asObservable(),
    ]).pipe(
      map(([expenses, currentDate]) => {
        return expenses.filter((expense) => {
          return (
            expense.date.getFullYear() === currentDate.getFullYear() &&
            expense.date.getMonth() === currentDate.getMonth()
          );
        });
      })
    );
  }
}
