import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggageFormComponent } from './baggage-form.component';

describe('BaggageFormComponent', () => {
  let component: BaggageFormComponent;
  let fixture: ComponentFixture<BaggageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaggageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaggageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
