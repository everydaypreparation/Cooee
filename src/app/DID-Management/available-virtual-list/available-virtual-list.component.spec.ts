import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableVirtualListComponent } from './available-virtual-list.component';

describe('AvailableVirtualListComponent', () => {
  let component: AvailableVirtualListComponent;
  let fixture: ComponentFixture<AvailableVirtualListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableVirtualListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableVirtualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
