import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionArreteComponent } from './execution-arrete.component';

describe('ExecutionArreteComponent', () => {
  let component: ExecutionArreteComponent;
  let fixture: ComponentFixture<ExecutionArreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionArreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionArreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
