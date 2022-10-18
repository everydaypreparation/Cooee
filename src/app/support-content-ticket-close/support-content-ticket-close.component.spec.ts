import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportContentTicketCloseComponent } from './support-content-ticket-close.component';

describe('SupportContentTicketCloseComponent', () => {
  let component: SupportContentTicketCloseComponent;
  let fixture: ComponentFixture<SupportContentTicketCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportContentTicketCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportContentTicketCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
