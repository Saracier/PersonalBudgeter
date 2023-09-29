import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class CurrentDateService {
  shownDate = new BehaviorSubject(new Date());
  goToTodayCalendar = new Subject();

  addMonth() {
    this.shownDate.next(addMonths(this.shownDate.getValue(), 1));
  }

  subtractMonth() {
    this.shownDate.next(subMonths(this.shownDate.getValue(), 1));
  }

  setToday() {
    this.shownDate.next(new Date());
  }

  goToToday() {
    this.goToTodayCalendar.next(new Date());
  }
}
