import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgeterComponent } from './budgeter.component';
// import { HistoryComponent } from '../history/history.component';
import { StatisticsComponent } from '../statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: BudgeterComponent,
    children: [
      {
        path: 'Historia',
        loadChildren: () =>
          import('../history/history.module').then((m) => m.HistoryModule),
        // component: HistoryComponent,
        data: {
          title: 'Historia',
        },
      },
      {
        path: '',
        loadChildren: () =>
          import('../calendar/calendar.module').then((m) => m.CalendarModule),
        data: {
          title: 'Kalendarz',
        },
      },
      {
        path: 'ustawienia',
        loadChildren: () =>
          import('../setting/settings.module').then((m) => m.SettingsModule),
        data: {
          title: 'Ustawienia',
        },
      },
      {
        path: 'statystyki',
        loadChildren: () =>
          import('../statistics/statistics.module').then(
            (m) => m.StatisticsModule
          ),
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
