import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecipientComponent } from './addrecipient.component';

describe('AddrecipientComponent', () => {
  let component: AddrecipientComponent;
  let fixture: ComponentFixture<AddrecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
