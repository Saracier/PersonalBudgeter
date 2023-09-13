import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
// import { EditExpenseDirective } from './shared/directives/edit-expense.directive';
import { EditExpenseComponent } from './shared/edit-expense/edit-expense.component';
import { SharedDirectivesModule } from './shared-directives/shared-directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { CalendarComponent } from './containers/calendar/calendar.component';
import { SettingComponent } from './containers/setting/setting.component';
=======
>>>>>>> 4be0b9522b80952e9395ec8e0bc64559e86f2acf
@NgModule({
  declarations: [
    AppComponent,
    EditExpenseComponent,
    CalendarComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    SharedDirectivesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
