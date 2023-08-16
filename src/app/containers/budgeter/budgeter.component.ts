import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss'],
})
export class BudgeterComponent {
  @ViewChild('snav', { static: true }) snav!: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // setInterval(() => console.log(this.mobileQuery), 1000);
    // setInterval(() => {
    //   if (this.mobileQuery.matches) {
    //     console.log(this.snav);
    //     setInterval(() => this.snav.open(), 1000);
    //     // this.snav.toggle!();
    //   }
    // }, 1000);
  }

  // ngOnInit() {
  //   this.snav.open();
  //   // if (!this.mobileQuery.matches) {
  //   //   this.snav.open();
  //   //   // console.log(this.snav);
  //   //   // setInterval(() => this.snav.open(), 1000);
  //   //   // this.snav.toggle();
  //   // }
  // }

  // ngDoCheck() {
  //   if (!this.mobileQuery.matches) {
  //     console.log(this.snav);
  //     setInterval(() => this.snav.toggle(), 1000);
  //     // this.snav.toggle();
  //   }
  // }
  // ngDoCheck() {
  //   this.snav.open();
  // }

  toggleNavHandler() {
    this.snav.toggle();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
