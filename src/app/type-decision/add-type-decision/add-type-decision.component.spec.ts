import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeDecisionComponent } from './add-type-decision.component';

describe('AddTypeDecisionComponent', () => {
  let component: AddTypeDecisionComponent;
  let fixture: ComponentFixture<AddTypeDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
