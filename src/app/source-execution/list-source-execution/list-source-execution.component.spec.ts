import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSourceExecutionComponent } from './list-source-execution.component';

describe('ListSourceExecutionComponent', () => {
  let component: ListSourceExecutionComponent;
  let fixture: ComponentFixture<ListSourceExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSourceExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSourceExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
