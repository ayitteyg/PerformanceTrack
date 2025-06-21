import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsalesComponent } from './shopsales.component';

describe('ShopsalesComponent', () => {
  let component: ShopsalesComponent;
  let fixture: ComponentFixture<ShopsalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopsalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
