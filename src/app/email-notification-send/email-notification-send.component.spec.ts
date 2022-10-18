import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotificationSendComponent } from './email-notification-send.component';

describe('EmailNotificationSendComponent', () => {
  let component: EmailNotificationSendComponent;
  let fixture: ComponentFixture<EmailNotificationSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailNotificationSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailNotificationSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
