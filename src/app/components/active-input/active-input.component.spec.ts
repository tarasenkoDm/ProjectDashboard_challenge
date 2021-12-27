import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveInputComponent } from './active-input.component';

describe('ActiveInputComponent', () => {
  let component: ActiveInputComponent;
  let fixture: ComponentFixture<ActiveInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
