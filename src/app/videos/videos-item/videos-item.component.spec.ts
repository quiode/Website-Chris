import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosItemComponent } from './videos-item.component';

describe('VideosItemComponent', () => {
  let component: VideosItemComponent;
  let fixture: ComponentFixture<VideosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
