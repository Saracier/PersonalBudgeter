import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySingleComponent } from './history-single.component';

describe('HistorySingleComponent', () => {
  let component: HistorySingleComponent;
  let fixture: ComponentFixture<HistorySingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorySingleComponent]
    });
    fixture = TestBed.createComponent(HistorySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
