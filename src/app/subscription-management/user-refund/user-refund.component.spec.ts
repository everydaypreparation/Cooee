import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRefundComponent } from './user-refund.component';

describe('UserRefundComponent', () => {
  let component: UserRefundComponent;
  let fixture: ComponentFixture<UserRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
