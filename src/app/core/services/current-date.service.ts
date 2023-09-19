import { Injectable } from '@angular/core';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class CurrentDateService {
  shownDate = new BehaviorSubject(new Date());

  addMonth() {
    this.shownDate.next(addMonths(this.shownDate.getValue(), 1));
    console.log(addMonths(this.shownDate.getValue(), 1));
  }

  subtractMonth() {
    this.shownDate.next(subMonths(this.shownDate.getValue(), 1));
  }

  setToday() {
    this.shownDate.next(new Date());
  }
}
