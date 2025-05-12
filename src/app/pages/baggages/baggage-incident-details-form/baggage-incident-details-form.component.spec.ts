import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggageIncidentDetailsFormComponent } from './baggage-incident-details-form.component';

describe('BaggageIncidentDetailsFormComponent', () => {
  let component: BaggageIncidentDetailsFormComponent;
  let fixture: ComponentFixture<BaggageIncidentDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaggageIncidentDetailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaggageIncidentDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
