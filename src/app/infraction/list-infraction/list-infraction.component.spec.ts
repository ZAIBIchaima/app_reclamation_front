import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInfractionComponent } from './list-infraction.component';

describe('ListInfractionComponent', () => {
  let component: ListInfractionComponent;
  let fixture: ComponentFixture<ListInfractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInfractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInfractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
