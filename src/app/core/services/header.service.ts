import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private headerTextSubject = new BehaviorSubject<string>('');
  headerText = this.headerTextSubject.asObservable();

  setHeaderText(text: string) {
    this.headerTextSubject.next(text);
  }
  constructor() {}
}
