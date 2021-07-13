import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMatComponent } from './nav-mat.component';

describe('NavMatComponent', () => {
  let component: NavMatComponent;
  let fixture: ComponentFixture<NavMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
