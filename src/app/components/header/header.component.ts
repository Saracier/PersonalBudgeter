import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
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
  _shouldDisplayBurger = false;
  // headerTextSubscription = this.HeaderService.headerText.subscribe((text) => {
  //   this.headerText = text;
  // });
  // mobileQuery: MediaQueryList;
  // private _mobileQueryListener: () => void;
  @Output() toggleNav = new EventEmitter<void>();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private EditExpenseService: EditExpenseService
  ) {
    // this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this._mobileQueryListener);
    // setInterval(() => console.log(this.mobileQuery), 1000);
    // setInterval(() => {
    //   if (this.mobileQuery.matches) {
    //     console.log(this.snav);
    //     setInterval(() => this.snav.open(), 1000);
    //     // this.snav.toggle!();
    //   }
    // }, 1000);
  }

  ngOnInit() {
    if (!this.shouldDisplayBurger) {
      this.toggleNav.emit();

      // console.log(this.snav);
      // setInterval(() => this.snav.open(), 1000);
      // this.snav.toggle();
    }
  }

  toggleNavHandler() {
    this.toggleNav.emit();
  }

  openEditModal() {
    this.EditExpenseService.expenseToEdit = null;
    this.EditExpenseService.shouldModalBeDisplayed.next(true);
  }

  // ngOnDestroy() {
  //   // this.headerTextSubscription.unsubscribe();
  // }
}
