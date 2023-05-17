import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArreteComponent } from './add-arrete.component';

describe('AddArreteComponent', () => {
  let component: AddArreteComponent;
  let fixture: ComponentFixture<AddArreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
