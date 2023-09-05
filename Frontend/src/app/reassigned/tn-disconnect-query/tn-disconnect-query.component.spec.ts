import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnDisconnectQueryComponent } from './tn-disconnect-query.component';

describe('TnDisconnectQueryComponent', () => {
  let component: TnDisconnectQueryComponent;
  let fixture: ComponentFixture<TnDisconnectQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnDisconnectQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnDisconnectQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
