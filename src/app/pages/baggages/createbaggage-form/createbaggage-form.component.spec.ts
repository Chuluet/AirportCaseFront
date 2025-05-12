import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBaggageFormComponent } from './createbaggage-form.component';

describe('CreatebaggageFormComponent', () => {
  let component: CreateBaggageFormComponent;
  let fixture: ComponentFixture<CreateBaggageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBaggageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBaggageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
