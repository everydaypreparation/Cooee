import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRefundRejectComponent } from './user-refund-reject.component';

describe('UserRefundRejectComponent', () => {
  let component: UserRefundRejectComponent;
  let fixture: ComponentFixture<UserRefundRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRefundRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRefundRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
