import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlightFormComponent } from './createflight-form.component';

describe('CreateflightFormComponent', () => {
  let component: CreateFlightFormComponent;
  let fixture: ComponentFixture<CreateFlightFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFlightFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFlightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
