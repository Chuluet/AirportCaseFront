import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggageListComponent } from './baggage-list.component';

describe('BaggageListComponent', () => {
  let component: BaggageListComponent;
  let fixture: ComponentFixture<BaggageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaggageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaggageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
