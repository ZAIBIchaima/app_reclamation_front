import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntiteComponent } from './list-entite.component';

describe('ListEntiteComponent', () => {
  let component: ListEntiteComponent;
  let fixture: ComponentFixture<ListEntiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEntiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
