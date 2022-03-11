import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinktreeLinkComponent } from './linktree-link.component';

describe('LinktreeLinkComponent', () => {
  let component: LinktreeLinkComponent;
  let fixture: ComponentFixture<LinktreeLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinktreeLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinktreeLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
