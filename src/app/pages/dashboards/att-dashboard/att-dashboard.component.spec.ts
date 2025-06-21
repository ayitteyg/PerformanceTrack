import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttDashboardComponent } from './att-dashboard.component';

describe('AttDashboardComponent', () => {
  let component: AttDashboardComponent;
  let fixture: ComponentFixture<AttDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
