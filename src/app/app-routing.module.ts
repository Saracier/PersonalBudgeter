import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    // component: AppComponent,
    children: [
      {
        path: 'Historia',
        loadChildren: () =>
          import('./containers/history/history.module').then(
            (m) => m.HistoryModule
          ),
        // component: HistoryComponent,
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
        path: 'ustawienia',
        loadChildren: () =>
          import('./containers/setting/settings.module').then(
            (m) => m.SettingsModule
          ),
        // component: SettingComponent,
        data: {
          title: 'Ustawienia',
        },
      },
      {
        path: 'statystyki',
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
