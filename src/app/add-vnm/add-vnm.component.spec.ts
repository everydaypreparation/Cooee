import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVnmComponent } from './add-vnm.component';

describe('AddVnmComponent', () => {
  let component: AddVnmComponent;
  let fixture: ComponentFixture<AddVnmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVnmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVnmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
