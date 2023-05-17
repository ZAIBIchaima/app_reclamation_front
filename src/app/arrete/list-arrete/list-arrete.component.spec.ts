import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArreteComponent } from './list-arrete.component';

describe('ListArreteComponent', () => {
  let component: ListArreteComponent;
  let fixture: ComponentFixture<ListArreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
