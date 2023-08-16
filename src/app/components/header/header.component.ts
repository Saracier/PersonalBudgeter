import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
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
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  headerText: string = '';
  headerTextSubscription = this.HeaderService.headerText.subscribe((text) => {
    this.headerText = text;
  });
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @Output() toggleNav = new EventEmitter<void>();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private HeaderService: HeaderService
  ) {
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

  ngOnInit() {
    if (!this.mobileQuery.matches) {
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
    this.headerTextSubscription.unsubscribe();
  }
}
