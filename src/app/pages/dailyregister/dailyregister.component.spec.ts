import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyregisterComponent } from './dailyregister.component';

describe('DailyregisterComponent', () => {
  let component: DailyregisterComponent;
  let fixture: ComponentFixture<DailyregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
