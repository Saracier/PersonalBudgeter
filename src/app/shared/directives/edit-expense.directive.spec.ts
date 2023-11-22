import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExpenseDirective } from './edit-expense.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appEditExpense></div>`,
})
class TestHostComponent {
  @ViewChild(EditExpenseDirective) directive!: EditExpenseDirective;
}

describe('EditExpenseDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, EditExpenseDirective],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.directive(EditExpenseDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = component.directive;
    expect(directive).toBeTruthy();
  });

  it('should have ViewContainerRef', () => {
    const directive = component.directive;
    expect(directive.viewContainerRef).toBeTruthy();
  });
});
