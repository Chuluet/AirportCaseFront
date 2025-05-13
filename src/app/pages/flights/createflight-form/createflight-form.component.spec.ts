import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateflightFormComponent } from './createflight-form.component';

describe('CreateflightFormComponent', () => {
  let component: CreateflightFormComponent;
  let fixture: ComponentFixture<CreateflightFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateflightFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateflightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
