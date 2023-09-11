import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class EditExpenseService {
  shouldModalBeDisplayed = new BehaviorSubject(false);
  constructor() {}
}
