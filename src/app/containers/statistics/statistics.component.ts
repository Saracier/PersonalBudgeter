import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Category } from 'src/app/enums/category';
import { IExpense } from 'src/app/interfaces/iexpense';
import { ISettingsExpences } from 'src/app/interfaces/isettings-expences';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { ExpencesSettingsService } from 'src/app/core/services/expenses-settings.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  @ViewChild('budgetRealisationBarCanvas', { static: true })
  budgetRealisationBarCanvas!: ElementRef;
  @ViewChild('budgetIncomeCanvas', { static: true })
  budgetIncomeCanvas!: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  budgetRealisationChart: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  budgetIncomeChart: any;
  categoryEnum = Object.keys(Category);
  categoryFulfillment: number[];
  monthlyExpenses: IExpense[] = [];
  expenceSetting: ISettingsExpences;
  expensesSubscripction = this.ExpensesService.filterExpenses().subscribe(
    (expenses) => {
      console.log('expences weszło', expenses);
      this.monthlyExpenses = expenses;
      if (this.budgetRealisationChart) {
        this.createRealisationBarChart();
      }
      if (this.budgetIncomeChart) {
        this.createIncomeBarChart();
      }
      if (expenses.length === 0) return;
    }
  );
  expensesSettingsSubscripction =
    this.ExpencesSettingsService.expensesSettings.subscribe(
      (expenceSetting: ISettingsExpences) => {
        this.expenceSetting = expenceSetting;
      }
    );

  constructor(
    private ExpensesService: ExpensesService,
    private ExpencesSettingsService: ExpencesSettingsService
  ) {}

  ngOnInit(): void {
    this.createRealisationBarChart();
    this.createIncomeBarChart();
  }

  prepareDataIncomeBar() {
    let sumExpenses = 0;
    let sumIncome = 0;
    this.monthlyExpenses.forEach((element) => {
      sumExpenses += element.value;
    });
    Object.keys(this.expenceSetting).forEach((key) => {
      sumIncome += this.expenceSetting[key as keyof ISettingsExpences];
    });
    let percentageFulfillment = (sumExpenses / sumIncome) * 100;
    percentageFulfillment = Number(percentageFulfillment.toFixed(2));
    return [percentageFulfillment];
  }

  prepareMonthlyExpensesData() {
    console.log(this.expenceSetting);
    const resultArray: number[] = [];
    this.categoryEnum.forEach((enumElement, index) => {
      resultArray.push(0);
      this.monthlyExpenses.forEach((expense) => {
        if (expense.category === enumElement) {
          resultArray[index] += expense.value;
        }
      });
      const currentEnumValueAsString = enumElement;

      resultArray[index] =
        (resultArray[index] /
          this.expenceSetting[
            currentEnumValueAsString as keyof ISettingsExpences
          ]) *
        100;

      // Next line rounds final value to 2 decimals. It preserves to show on the chart something like 9,20131%
      resultArray[index] = Number(resultArray[index].toFixed(2));
    });
    console.log(resultArray);
    return resultArray;
  }

  shouldDisplayLegend() {
    if (window.screen.width >= 700) {
      return false;
    }
    return true;
  }

  createIncomeBarChart() {
    if (this.budgetIncomeChart) {
      this.budgetIncomeChart.destroy();
    }
    this.budgetIncomeChart = new Chart(this.budgetIncomeCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          {
            data: this.prepareDataIncomeBar(),
            // data: this.prepareMonthlyExpensesData(),
            borderWidth: 1,
            borderSkipped: 'end',
            backgroundColor: 'green',
          },
        ],
      },
      options: {
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 50,
            },
          },
        },
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 1,
          },
        },
        responsive: false,
        aspectRatio: 1 | 3,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Procent wydanego przychodu',
            font: {
              size: 22,
            },
          },
        },
      },
    });
  }

  createRealisationBarChart() {
    if (this.budgetRealisationChart) {
      this.budgetRealisationChart.destroy();
    }
    this.budgetRealisationChart = new Chart(
      this.budgetRealisationBarCanvas.nativeElement,
      {
        type: 'bar',
        data: {
          labels: this.categoryEnum,
          datasets: [
            {
              data: this.prepareMonthlyExpensesData(),
              borderWidth: 1,
              borderSkipped: 'end',
              backgroundColor: 'green',
            },
          ],
        },
        options: {
          scales: {
            x: {
              min: 0,
              max: 100,
              ticks: {
                stepSize: 50,
              },
            },
          },
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 1,
            },
          },
          responsive: true,
          aspectRatio: 1 | 1,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Stopień realizacji budżetu',
              font: {
                size: 22,
              },
            },
          },
        },
      }
    );
  }

  ngOnDestroy() {
    this.expensesSubscripction.unsubscribe();
    this.expensesSettingsSubscripction.unsubscribe();
  }
}
