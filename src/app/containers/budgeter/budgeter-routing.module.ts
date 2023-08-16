import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgeterComponent } from './budgeter.component';

const routes: Routes = [{ path: '', component: BudgeterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgeterRoutingModule {}
