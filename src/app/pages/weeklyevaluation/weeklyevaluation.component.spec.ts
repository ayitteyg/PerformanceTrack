import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyevaluationComponent } from './weeklyevaluation.component';

describe('WeeklyevaluationComponent', () => {
  let component: WeeklyevaluationComponent;
  let fixture: ComponentFixture<WeeklyevaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyevaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
