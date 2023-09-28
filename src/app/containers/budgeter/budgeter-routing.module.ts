import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgeterComponent } from './budgeter.component';
import { HistoryComponent } from '../history/history.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { SettingComponent } from '../setting/setting.component';
import { StatisticsComponent } from '../statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: BudgeterComponent,
    children: [
      {
        path: 'Historia',
        component: HistoryComponent,
        data: {
          title: 'Historia',
        },
      },
      {
        path: '',
        component: CalendarComponent,
        data: {
          title: 'Kalendarz',
        },
      },
      {
        path: 'ustawienia',
        component: SettingComponent,
        data: {
          title: 'Ustawienia',
        },
      },
      {
        path: 'statystyki',
        component: StatisticsComponent,
        data: {
          title: 'Statystyki',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgeterRoutingModule {}
