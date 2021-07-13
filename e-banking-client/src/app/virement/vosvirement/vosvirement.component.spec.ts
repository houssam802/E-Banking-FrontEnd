import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VosvirementComponent } from './vosvirement.component';

describe('VosvirementComponent', () => {
  let component: VosvirementComponent;
  let fixture: ComponentFixture<VosvirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VosvirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VosvirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
