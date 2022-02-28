import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinktreeComponent } from './linktree.component';

describe('LinktreeComponent', () => {
  let component: LinktreeComponent;
  let fixture: ComponentFixture<LinktreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinktreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinktreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
