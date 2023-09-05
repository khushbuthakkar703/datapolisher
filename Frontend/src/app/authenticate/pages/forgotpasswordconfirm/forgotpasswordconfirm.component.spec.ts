import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordconfirmComponent } from './forgotpasswordconfirm.component';

describe('ForgotpasswordconfirmComponent', () => {
  let component: ForgotpasswordconfirmComponent;
  let fixture: ComponentFixture<ForgotpasswordconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswordconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
