import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';
import { EditExpenseComponent } from '../../shared/edit-expense/edit-expense.component';
import { EditExpenseDirective } from 'src/app/shared/directives/edit-expense.directive';

@Component({
  selector: 'app-budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss'],
})
export class BudgeterComponent implements OnInit, OnDestroy {
  @ViewChild('snav', { static: true }) snav!: MatSidenav;
  mobileQuery: MediaQueryList;
  title$: Observable<string | null> = this.router.events.pipe(
    map(() => {
      const child: ActivatedRoute | null = this.route.firstChild;
      const title = child && child.snapshot.data['title'];
      if (title) {
        return title;
      }
      return null;
    })
  );
  breakpointObserver$ = this.breakpointObserver.observe([Breakpoints.XSmall]);
  private _mobileQueryListener: () => void;
  @ViewChild(EditExpenseDirective, { static: false })
  EditExpenseDirective: EditExpenseDirective;
  private closeDynamicComponentSub: Subscription;

  editModalSubscripction: Subscription;
  routerShowAppMonthSubscripction: Subscription;
  shouldShowAppMonth = true;
  // editModalSubscripction: Subscription =
  //   this.EditExpenseService.shouldModalBeDisplayed.subscribe(
  //     (shouldBeDisplayed) => {
  //       if (shouldBeDisplayed) {
  //         this.openEditModal();
  //       } else {
  //         this.closeEditModal();
  //       }
  //     }
  //   );

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private EditExpenseService: EditExpenseService,
    private componentFactoryResolver: ComponentFactoryResolver
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
    router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        if (value.url === '/ustawienia') {
          this.shouldShowAppMonth = false;
        } else {
          this.shouldShowAppMonth = true;
        }
      }
    });
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

  ngOnInit() {
    this.editModalSubscripction =
      this.EditExpenseService.shouldModalBeDisplayed.subscribe(
        (shouldBeDisplayed) => {
          if (shouldBeDisplayed) {
            this.openEditModal();
          }
        }
      );
  }

  toggleNavHandler() {
    this.snav.toggle();
  }

  openEditModal() {
    const editFactoryResolver =
      this.componentFactoryResolver.resolveComponentFactory(
        EditExpenseComponent
      );

    const hostViewContainerRef = this.EditExpenseDirective.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef =
      hostViewContainerRef.createComponent(editFactoryResolver);

    // componentRef.instance.message = message;
    this.closeDynamicComponentSub = componentRef.instance.closeEvent.subscribe(
      () => {
        console.log('elo elo');
        this.closeDynamicComponentSub.unsubscribe();
        hostViewContainerRef.clear();
        this.EditExpenseService.expenseToEdit = null;
      }
    );
  }

  // private closeEditModal() {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.closeDynamicComponentSub.unsubscribe();
    this.editModalSubscripction.unsubscribe();
    this.routerShowAppMonthSubscripction.unsubscribe();
  }
}
