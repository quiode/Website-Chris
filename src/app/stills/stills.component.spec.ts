import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StillsComponent } from './stills.component';

describe('StillsComponent', () => {
  let component: StillsComponent;
  let fixture: ComponentFixture<StillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
