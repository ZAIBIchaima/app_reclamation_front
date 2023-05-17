import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeDecisionComponent } from './list-type-decision.component';

describe('ListTypeDecisionComponent', () => {
  let component: ListTypeDecisionComponent;
  let fixture: ComponentFixture<ListTypeDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTypeDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
