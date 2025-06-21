import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralHomepageComponent } from './general-homepage.component';

describe('GeneralHomepageComponent', () => {
  let component: GeneralHomepageComponent;
  let fixture: ComponentFixture<GeneralHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
