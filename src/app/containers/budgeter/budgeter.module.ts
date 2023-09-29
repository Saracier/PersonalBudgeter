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
// import { CalendarComponent } from '../calendar/calendar.component';
import { MonthComponent } from 'src/app/components/month/month.component';
// import { HistorySingleComponent } from 'src/app/components/history-single/history-single.component';
import { FilterMonthPipe } from '../../shared/pipes/filter-month.pipe';
// import { EditExpenseDirective } from '../../shared/directives/edit-expense.directive';
// import { EditExpenseDirective } from '../../app.module';
import { SharedDirectivesModule } from '../../shared-directives/shared-directives.module';
// import { CalendarSingleComponent } from 'src/app/components/calendar-single/calendar-single.component';
// import { CalendarPaginationComponent } from 'src/app/components/calendar-pagination/calendar-pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { CalendarDayComponent } from 'src/app/components/calendar-day/calendar-day.component';

@NgModule({
  declarations: [
    BudgeterComponent,
    NavigationComponent,
    HeaderComponent,
    MonthComponent,
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
    MatPaginatorModule,
  ],
})
export class BudgeterModule {}
