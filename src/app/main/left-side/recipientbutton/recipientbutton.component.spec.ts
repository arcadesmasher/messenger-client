import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientbuttonComponent } from './recipientbutton.component';

describe('RecipientbuttonComponent', () => {
  let component: RecipientbuttonComponent;
  let fixture: ComponentFixture<RecipientbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
