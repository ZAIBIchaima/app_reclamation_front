import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfractionComponent } from './add-infraction.component';

describe('AddInfractionComponent', () => {
  let component: AddInfractionComponent;
  let fixture: ComponentFixture<AddInfractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInfractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
