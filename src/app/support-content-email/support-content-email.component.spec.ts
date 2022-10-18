import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportContentEmailComponent } from './support-content-email.component';

describe('SupportContentEmailComponent', () => {
  let component: SupportContentEmailComponent;
  let fixture: ComponentFixture<SupportContentEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportContentEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportContentEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
