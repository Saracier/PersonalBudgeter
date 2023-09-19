import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewContainerRef } from '@angular/core';
import { EditExpenseDirective } from './edit-expense.directive';

@Component({
  template: ` <div appEditExpense></div> `,
})
class TestComponent {}

describe('EditExpenseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, EditExpenseDirective],
    });
    fixture = TestBed.createComponent(TestComponent);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new EditExpenseDirective(
      debugElement.injector.get(ViewContainerRef)
    );
    expect(directive).toBeTruthy();
  });

  it('should have the appEditExpense attribute', () => {
    const divElement = debugElement.nativeElement.querySelector('div');
    expect(divElement.hasAttribute('appEditExpense')).toBe(true);
  });

  it('should have ViewContainerRef injected', () => {
    const directive = debugElement.injector.get(EditExpenseDirective);
    expect(directive.viewContainerRef).toBeDefined();
  });
});
