import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StillItemComponent } from './still-item.component';

describe('StillItemComponent', () => {
  let component: StillItemComponent;
  let fixture: ComponentFixture<StillItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StillItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StillItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
