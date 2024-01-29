import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { HistorySingleComponent } from 'src/app/components/history-single/history-single.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedDirectivesModule } from 'src/app/containers/shared-directives/shared-directives.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HistoryRoutingModule } from './history-routing.module';

@NgModule({
  declarations: [HistoryComponent, HistorySingleComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    SharedDirectivesModule,
    MatPaginatorModule,
    HistoryRoutingModule,
  ],
})
export class HistoryModule {}
