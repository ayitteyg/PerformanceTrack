import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapDashboardComponent } from './cap-dashboard.component';

describe('CapDashboardComponent', () => {
  let component: CapDashboardComponent;
  let fixture: ComponentFixture<CapDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
