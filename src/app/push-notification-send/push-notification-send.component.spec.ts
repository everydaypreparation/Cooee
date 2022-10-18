import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotificationSendComponent } from './push-notification-send.component';

describe('PushNotificationSendComponent', () => {
  let component: PushNotificationSendComponent;
  let fixture: ComponentFixture<PushNotificationSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushNotificationSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PushNotificationSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
