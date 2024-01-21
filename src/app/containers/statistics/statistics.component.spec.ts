import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticsComponent } from './statistics.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    spyOn(component, 'createIncomeBarChart');
    spyOn(component, 'createCategoryDonutChart');
    spyOn(component, 'createRealisationBarChart');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and create charts on init', () => {
    expect(component.createIncomeBarChart).toHaveBeenCalled();
    expect(component.createCategoryDonutChart).toHaveBeenCalled();
    expect(component.createRealisationBarChart).toHaveBeenCalled();
  });
});
