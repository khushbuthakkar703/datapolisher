import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotusernameconfirmComponent } from './forgotusernameconfirm.component';

describe('ForgotusernameconfirmComponent', () => {
  let component: ForgotusernameconfirmComponent;
  let fixture: ComponentFixture<ForgotusernameconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotusernameconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotusernameconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
