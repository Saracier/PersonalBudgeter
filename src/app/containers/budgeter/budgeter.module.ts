import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgeterRoutingModule } from './budgeter-routing.module';
import { BudgeterComponent } from './budgeter.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HistoryComponent } from '../history/history.component';
import { MonthComponent } from 'src/app/components/month/month.component';
import { HistorySingleComponent } from 'src/app/components/history-single/history-single.component';
import { FilterMonthPipe } from '../../shared/pipes/filter-month.pipe';
// import { EditExpenseDirective } from '../../shared/directives/edit-expense.directive';
// import { EditExpenseDirective } from '../../app.module';
import { SharedDirectivesModule } from '../../shared-directives/shared-directives.module';

@NgModule({
  declarations: [
    BudgeterComponent,
    NavigationComponent,
    HeaderComponent,
    HistoryComponent,
    MonthComponent,
    HistorySingleComponent,
    FilterMonthPipe,
  ],
  imports: [
    CommonModule,
    BudgeterRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    SharedDirectivesModule,
  ],
})
export class BudgeterModule {}
