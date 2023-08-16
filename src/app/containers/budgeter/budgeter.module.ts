import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgeterRoutingModule } from './budgeter-routing.module';
import { BudgeterComponent } from './budgeter.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [BudgeterComponent, NavigationComponent, HeaderComponent],
  imports: [
    CommonModule,
    BudgeterRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
})
export class BudgeterModule {}
