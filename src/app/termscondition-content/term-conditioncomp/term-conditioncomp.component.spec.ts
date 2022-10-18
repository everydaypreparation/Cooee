import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermConditioncompComponent } from './term-conditioncomp.component';

describe('TermConditioncompComponent', () => {
  let component: TermConditioncompComponent;
  let fixture: ComponentFixture<TermConditioncompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermConditioncompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermConditioncompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
