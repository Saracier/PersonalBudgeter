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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  budgetRealisationChart: any;
  categoryEnum = Object.keys(Category);
  categoryFulfillment: number[];
  monthlyExpenses: IExpense[] = [];
  expenceSetting: ISettingsExpences;
  expensesSubscripction = this.ExpensesService.filterExpenses().subscribe(
    (expenses) => {
      console.log('expences weszło', expenses);
      this.monthlyExpenses = expenses;
      if (this.budgetRealisationChart) {
        this.createChart2();
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
    this.createChart2();
  }

  prepareData() {
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

  shouldLegend() {
    if (window.screen.width >= 700) {
      return false;
    }
    return true;
  }

  createChart2() {
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
              data: this.prepareData(),
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
              text: 'Chart.js Horizontal Bar Chart',
              font: {
                size: 22,
              },
            },
          },
        },
      }
    );
  }

  createChart() {
    new Chart('budgetRealisationChart', {
      type: 'bar',

      data: {
        // values on X-Axis
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'blue',
          },
          {
            label: 'Profit',
            data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
            backgroundColor: 'limegreen',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  ngOnDestroy() {
    this.expensesSubscripction.unsubscribe();
    this.expensesSettingsSubscripction.unsubscribe();
  }
}
