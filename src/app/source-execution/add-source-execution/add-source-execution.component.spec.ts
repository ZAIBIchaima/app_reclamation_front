import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSourceExecutionComponent } from './add-source-execution.component';

describe('AddSourceExecutionComponent', () => {
  let component: AddSourceExecutionComponent;
  let fixture: ComponentFixture<AddSourceExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSourceExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSourceExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
