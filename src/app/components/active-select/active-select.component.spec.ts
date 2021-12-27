import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSelectComponent } from './active-select.component';

describe('ActiveSelectComponent', () => {
  let component: ActiveSelectComponent;
  let fixture: ComponentFixture<ActiveSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
