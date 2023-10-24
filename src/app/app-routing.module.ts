import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Historia',
        loadChildren: () =>
          import('./containers/history/history.module').then(
            (m) => m.HistoryModule
          ),
        data: {
          title: 'Historia',
        },
      },
      {
        path: '',
        loadChildren: () =>
          import('./containers/calendar/calendar.module').then(
            (m) => m.CalendarModule
          ),
        data: {
          title: 'Kalendarz',
        },
      },
      {
        path: 'Ustawienia',
        loadChildren: () =>
          import('./containers/setting/settings.module').then(
            (m) => m.SettingsModule
          ),
        data: {
          title: 'Ustawienia',
        },
      },
      {
        path: 'Statystyki',
        loadChildren: () =>
          import('./containers/statistics/statistics.module').then(
            (m) => m.StatisticsModule
          ),
        data: {
          title: 'Statystyki',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
