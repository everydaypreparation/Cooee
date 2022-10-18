import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailRejectComponent } from './user-detail-reject.component';

describe('UserDetailRejectComponent', () => {
  let component: UserDetailRejectComponent;
  let fixture: ComponentFixture<UserDetailRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
