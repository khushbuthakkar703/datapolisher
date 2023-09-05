import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecknumberComponent } from './checknumber.component';

describe('ChecknumberComponent', () => {
  let component: ChecknumberComponent;
  let fixture: ComponentFixture<ChecknumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecknumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecknumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
