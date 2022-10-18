import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRefundApproveComponent } from './user-refund-approve.component';

describe('UserRefundApproveComponent', () => {
  let component: UserRefundApproveComponent;
  let fixture: ComponentFixture<UserRefundApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRefundApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRefundApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
