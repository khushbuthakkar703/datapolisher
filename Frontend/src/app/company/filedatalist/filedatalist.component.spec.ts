import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledatalistComponent } from './filedatalist.component';

describe('FiledatalistComponent', () => {
  let component: FiledatalistComponent;
  let fixture: ComponentFixture<FiledatalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiledatalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledatalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
