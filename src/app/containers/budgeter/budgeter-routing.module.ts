import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgeterComponent } from './budgeter.component';
import { HistoryComponent } from '../history/history.component';

const routes: Routes = [
  {
    path: '',
    component: BudgeterComponent,
    children: [
      {
        path: '',
        component: HistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgeterRoutingModule {}
