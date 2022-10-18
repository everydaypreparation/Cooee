import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailApproveComponent } from './user-detail-approve.component';

describe('UserDetailApproveComponent', () => {
  let component: UserDetailApproveComponent;
  let fixture: ComponentFixture<UserDetailApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
