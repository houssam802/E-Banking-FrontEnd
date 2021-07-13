import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrincpComponent } from './dashboard-princp.component';

describe('DashboardPrincpComponent', () => {
  let component: DashboardPrincpComponent;
  let fixture: ComponentFixture<DashboardPrincpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPrincpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPrincpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
