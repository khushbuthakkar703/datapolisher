import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnQueryUploadComponent } from './tn-query-upload.component';

describe('TnQueryUploadComponent', () => {
  let component: TnQueryUploadComponent;
  let fixture: ComponentFixture<TnQueryUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnQueryUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnQueryUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
