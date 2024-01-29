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
  @ViewChild('budgetCategoryDonutCanvas', { static: true })
  budgetCategoryDonutCanvas!: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  budgetRealisationChart: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  budgetIncomeChart: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  budgetCategoryChart: any;
  categoryEnum = Object.keys(Category);
  categoryFulfillment: number[];
  monthlyExpenses: IExpense[] = [];
  expenceSetting: ISettingsExpences;
  expensesSubscripction$ = this.ExpensesService.filterExpenses$().subscribe(
    (expenses) => {
      this.monthlyExpenses = expenses;
      if (this.budgetRealisationChart) {
        this.createRealisationBarChart();
      }
      if (this.budgetIncomeChart) {
        this.createIncomeBarChart();
      }
      if (this.budgetIncomeChart) {
        this.createCategoryDonutChart();
      }
      if (expenses.length === 0) return;
    }
  );
  expensesSettingsSubscripction$ =
    this.ExpencesSettingsService.expensesSettings$.subscribe(
      (expenceSetting: ISettingsExpences) => {
        this.expenceSetting = expenceSetting;
      }
    );
  mapEngToPl = {
    House: 'Dom',
    Transport: 'Transport',
    Telecomunication: 'Telekomunikacja',
    HealthCare: 'Opieka zdrowotna',
    Clothes: 'Ubrania',
    Debts: 'Spłata zadłużeń',
    Entertiment: 'Rozrywka',
    Food: 'Jedzenie',
    Hygiene: 'Higiena',
    Kids: 'Dzieci',
    Other: 'Inne',
    Saving: 'Oszczędności',
  };

  constructor(
    private ExpensesService: ExpensesService,
    private ExpencesSettingsService: ExpencesSettingsService
  ) {}

  ngOnInit(): void {
    this.createRealisationBarChart();
    this.createIncomeBarChart();
    this.createCategoryDonutChart();
  }

  prepareLabels() {
    return this.categoryEnum.map((name) => {
      return this.mapEngToPl[name as keyof ISettingsExpences];
    });
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
    const resultArray: number[] = [];
    this.categoryEnum.forEach((enumElement, index) => {
      resultArray.push(0);
      this.monthlyExpenses.forEach((expense) => {
        if (expense.category === enumElement) {
          resultArray[index] += expense.value;
        }
      });
    });
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
              stepSize: 10,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 1,
          },
        },
        responsive: true,
        aspectRatio: 5,
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

  createCategoryDonutChart() {
    if (this.budgetCategoryChart) {
      this.budgetCategoryChart.destroy();
    }
    this.budgetCategoryChart = new Chart(
      this.budgetCategoryDonutCanvas.nativeElement,
      {
        type: 'doughnut',
        data: {
          labels: this.prepareLabels(),
          datasets: [
            {
              label: 'Udział w wydatkach',
              data: this.prepareMonthlyExpensesData(),
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(162, 86, 162)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 86, 205)',
                'rgb(86, 162, 86)',
                'rgb(235, 127, 54)',
                'rgb(99, 255, 222)',
                'rgb(80,80,80)',
                'rgb(144, 199, 255)',
                'rgb(210, 255, 99)',
                'rgb(162, 124, 86)',
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Udział kategorii w wydatkach',
              font: {
                size: 22,
              },
            },
          },
        },
      }
    );
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
          labels: this.prepareLabels(),
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
            y: {
              beginAtZero: true,
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
    this.expensesSubscripction$.unsubscribe();
    this.expensesSettingsSubscripction$.unsubscribe();
  }
}
