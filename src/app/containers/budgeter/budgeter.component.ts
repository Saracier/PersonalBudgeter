import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss'],
})
export class BudgeterComponent {
  @ViewChild('snav', { static: true }) snav!: MatSidenav;
  mobileQuery: MediaQueryList;
  title$: Observable<string | null> = this.router.events.pipe(
    map((event) => {
      const child: ActivatedRoute | null = this.route.firstChild;
      let title = child && child.snapshot.data['title'];
      if (title) {
        return title;
      }
      return null;
    })
  );
  breakpointObserver$ = this.breakpointObserver.observe([Breakpoints.XSmall]);
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
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
