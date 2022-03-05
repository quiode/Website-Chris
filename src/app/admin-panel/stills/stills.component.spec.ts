import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStillsComponent } from './stills.component';

describe('StillsComponent', () => {
  let component: AdminStillsComponent;
  let fixture: ComponentFixture<AdminStillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStillsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
