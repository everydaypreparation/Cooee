import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVnmComponent } from './delete-vnm.component';

describe('DeleteVnmComponent', () => {
  let component: DeleteVnmComponent;
  let fixture: ComponentFixture<DeleteVnmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVnmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVnmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
