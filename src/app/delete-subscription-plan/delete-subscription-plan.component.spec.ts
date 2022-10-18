import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubscriptionPlanComponent } from './delete-subscription-plan.component';

describe('DeleteSubscriptionPlanComponent', () => {
  let component: DeleteSubscriptionPlanComponent;
  let fixture: ComponentFixture<DeleteSubscriptionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSubscriptionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubscriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
