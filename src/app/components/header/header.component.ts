import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() headerText: string | null = null;
  @Input() set shouldDisplayBurger(value: boolean) {
    console.log('value', value);
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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
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

  ngOnDestroy() {
    // this.headerTextSubscription.unsubscribe();
  }
}
