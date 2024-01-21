import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerText: string | null = null;
  @Input() set shouldDisplayBurger(value: boolean) {
    this._shouldDisplayBurger = value;
  }

  get shouldDisplayBurger(): boolean {
    return this._shouldDisplayBurger;
  }

  @Output() toggleNav = new EventEmitter<void>();
  _shouldDisplayBurger = false;

  constructor(private EditExpenseService: EditExpenseService) {}

  ngOnInit() {
    if (!this.shouldDisplayBurger) {
      this.toggleNav.emit();
    }
  }

  toggleNavHandler() {
    this.toggleNav.emit();
  }

  openEditModal() {
    this.EditExpenseService.expenseToEdit = null;
    this.EditExpenseService.shouldModalBeDisplayed$.next(true);
  }
}
