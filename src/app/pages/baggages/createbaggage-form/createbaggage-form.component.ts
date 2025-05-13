import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AlertService } from 'src/app/services/alert/alert.service';
import { BaggageService } from 'src/app/services/baggage/baggage.service';
import { Baggage } from 'src/app/models/baggage.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Passenger } from 'src/app/models/passenger.model';
import { Flight } from 'src/app/models/flight.model';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { FlightService } from 'src/app/services/flight/flight.service';

@Component({
  selector: 'app-createbaggage-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './createbaggage-form.component.html',
  styleUrl: './createbaggage-form.component.scss'
})
export class CreateBaggageFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  baggageId = '';
  passengers: Passenger[] = [];
  flights: Flight[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private baggageService: BaggageService,
    private alertService: AlertService,
    private flightService: FlightService,
    private passengerService: PassengerService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPassengers();
    this.loadFlights();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.baggageId = id;
        this.editMode = true;
        this.loadBaggage(id);
      }
    });
  }

  loadPassengers(): void {
    this.passengerService.getPassenger().subscribe({
      next: (data: Passenger[]) => this.passengers = data,
      error: () => console.error('Error loading passengers')
    });
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe({
      next: (data: Flight[]) => this.flights = data,
      error: () => console.error('Error loading flights')
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      passengerFk: ['', Validators.required],
      flightFk: ['', Validators.required],
      tagNumber: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0)]],
      dimensions: ['', Validators.required],
      status: ['Pending'],
      checkInLocation: ['', Validators.required],
      incidentDetails: [''],
    });
  }

  loadBaggage(id: string): void {
    this.baggageService.getBaggage().subscribe({
      next: (baggages: Baggage[]) => {
        const baggage = baggages.find(b => b.id === id);
        if (baggage) {
          this.form.patchValue({
            passengerFk: baggage.passengerFk,
            flightFk: baggage.flightFk,
            tagNumber: baggage.tagNumber,
            weight: baggage.weight,
            dimensions: baggage.dimensions,
            status: baggage.status,
            checkInLocation: baggage.checkInLocation,
            incidentDetails: baggage.incidentDetails
          });
        } else {
          console.warn('Baggage not found');
        }
      },
      error: () => console.error('Error fetching baggage list')
    });
  }

  guardarBaggage(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert("Please complete all required fields.");
      return;
    }

    const baggageData: Baggage = this.form.value;

    if (this.editMode && this.baggageId) {
      this.baggageService.updateBaggage(this.baggageId, baggageData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Success", "Baggage successfully updated").then(result => {
            if (result.isConfirmed) this.router.navigate(['/baggages']);
          });
        },
        error: () => console.error('Error updating baggage')
      });
    } else {
      this.baggageService.addBaggage(baggageData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Success", "Baggage successfully created").then(result => {
            if (result.isConfirmed) this.router.navigate(['/baggages']);
          });
        },
        error: () => console.error('Error creating baggage')
      });
    }
  }
}
