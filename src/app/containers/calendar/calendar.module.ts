import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedDirectivesModule } from 'src/app/containers/shared-directives/shared-directives.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarDayComponent } from 'src/app/components/calendar-day/calendar-day.component';
import { CalendarPaginationComponent } from 'src/app/components/calendar-pagination/calendar-pagination.component';
import { CalendarSingleComponent } from 'src/app/components/calendar-single/calendar-single.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarSingleComponent,
    CalendarPaginationComponent,
    CalendarDayComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    SharedDirectivesModule,
    MatPaginatorModule,
    CalendarRoutingModule,
  ],
})
export class CalendarModule {}
