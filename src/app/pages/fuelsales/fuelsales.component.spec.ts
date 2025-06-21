import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelsalesComponent } from './fuelsales.component';

describe('FuelsalesComponent', () => {
  let component: FuelsalesComponent;
  let fixture: ComponentFixture<FuelsalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuelsalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
