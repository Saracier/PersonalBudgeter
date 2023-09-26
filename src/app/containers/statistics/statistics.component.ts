import {
  AfterContentInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { endOfDay } from 'date-fns';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/enums/category';
import { IExpense } from 'src/app/interfaces/iexpense';
import { ISettingsExpences } from 'src/app/interfaces/isettings-expences';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { ExpencesSettingsService } from 'src/app/core/services/expenses-settings.service';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  @ViewChild('budgetRealisationCanvas', { static: true })
  budgetRealisationCanvas!: ElementRef;

  budgetRealisationChart: any;
  // public chart: any;
  // contextChart: any;
  // budgetRealisationChart: object;
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
      // console.log(this.contextChart);
      // this.contextChart.reset();
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
    // const canvas: HTMLCanvasElement = this.budgetRealisationChart.nativeElement;
    // this.contextChart = canvas.getContext('2d')!;
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
    });
    console.log(resultArray);
    return resultArray;
  }

  createChart2() {
    console.log(`createChart weszło`);
    // console.log('this.budgetRealisationChart', this.budgetRealisationChart);
    if (this.budgetRealisationChart) {
      this.budgetRealisationChart.destroy();
    }
    this.budgetRealisationChart = new Chart(
      this.budgetRealisationCanvas.nativeElement,
      {
        type: 'bar',
        data: {
          labels: this.categoryEnum,
          datasets: [
            {
              data: this.prepareData(),
              borderWidth: 2,
              borderSkipped: 'end',
              backgroundColor: 'green',
            },
          ],
        },
        options: {
          scales: {
            x: {
              min: 10,
              max: 100,
            },
          },
          indexAxis: 'y',
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          responsive: true,
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
      type: 'bar', //this denotes tha type of chart

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

  // @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef;
  // // @ViewChild('myCanvas')
  // // private myCanvas: ElementRef = {} as ElementRef;

  // // context: CanvasRenderingContext2D;

  // ngOnInit() {
  //   // const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
  //   // const context = canvas.getContext('2d')!;
  //   // // context.fillStyle = 'blue';
  //   // this.#drawRectangle(context);

  //   // this.prepareChart;

  //   const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
  //   const context = canvas.getContext('2d')!;
  //   new Chart(canvas, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [
  //         {
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }

  // #drawRectangle(context: CanvasRenderingContext2D) {
  //   context.fillRect(20, 20, 100, 100);
  //   context.strokeRect(100, 100, 200, 200);
  // }

  // prepareChart() {
  //   const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
  //   const context = canvas.getContext('2d')!;
  //   // context.fillStyle = 'blue';
  //   // this.#drawRectangle(context);

  //   // const canvas = document.getElementById('myChart')! as HTMLCanvasElement;
  //   // this.context = this.myCanvas.nativeElement.getContext('2d')!;
  //   // this.context.fillStyle = 'blue';
  //   // this.context.fillRect(0, 0, 300, 300);

  //   // const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  //   this.#drawRectangle(context);
  //   // context.fillStyle = 'blue';
  //   context.fillRect(20, 20, 100, 100);
  //   context.strokeRect(100, 100, 200, 200);
  //   // new Chart(canvas, {
  //   //   type: 'bar',
  //   //   data: {
  //   //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   //     datasets: [
  //   //       {
  //   //         label: '# of Votes',
  //   //         data: [12, 19, 3, 5, 2, 3],
  //   //         borderWidth: 1,
  //   //       },
  //   //     ],
  //   //   },
  //   //   options: {
  //   //     scales: {
  //   //       y: {
  //   //         beginAtZero: true,
  //   //       },
  //   //     },
  //   //   },
  //   // });
  //   // const data = [
  //   //   { year: 2010, count: 10 },
  //   //   { year: 2011, count: 20 },
  //   //   { year: 2012, count: 15 },
  //   //   { year: 2013, count: 25 },
  //   //   { year: 2014, count: 22 },
  //   //   { year: 2015, count: 30 },
  //   //   { year: 2016, count: 28 },
  //   // ];

  //   // new Chart(canvas, {
  //   //   type: 'bar',
  //   //   data: {
  //   //     labels: data.map((row) => row.year),
  //   //     datasets: [
  //   //       {
  //   //         label: 'Acquisitions by year',
  //   //         data: data.map((row) => row.count),
  //   //       },
  //   //     ],
  //   //   },
  //   // });
  // }
  ngOnDestroy() {
    this.expensesSubscripction.unsubscribe();
    this.expensesSettingsSubscripction.unsubscribe();
  }
}
