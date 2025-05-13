import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { Flight } from 'src/app/models/flight.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-createflight-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './createflight-form.component.html',
  styleUrl: './createflight-form.component.scss'
})
export class CreateFlightFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  flightId = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.flightId = id;
        this.editMode = true;
        this.getFlight(id);
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      flightNumber: ['', Validators.required],
      airline: ['', Validators.required],
      departureAirport: ['', Validators.required],
      arrivalAirport: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      route: ['', Validators.required],
      status: ['Scheduled', Validators.required],
      boardingGate: ['', Validators.required],
      aircraftType: ['', Validators.required],
      baggageClaim: ['', Validators.required]
    });
  }

  getFlight(id: string): void {
    this.flightService.getFlights().subscribe({
      next: (flights: Flight[]) => {
        const flight = flights.find(f => f.id === id);
        if (flight) {
          this.form.patchValue(flight);
        } else {
          console.warn('Flight not found');
        }
      },
      error: () => console.error('Error fetching flights')
    });
  }

  guardarFlight(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.ErrorAlert("Error", "Please fill in all required fields.");
      return;
    }

    const flightData: Flight = this.form.value;

    if (this.editMode && this.flightId) {
      this.flightService.updateFlight(this.flightId, flightData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Success", "Flight updated successfully").then(result => {
            if (result.isConfirmed) this.router.navigate(['/flights']);
          });
        },
        error: () => console.error('Error updating flight')
      });
    } else {
      this.flightService.addFlight(flightData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Success", "Flight created successfully").then(result => {
            if (result.isConfirmed) this.router.navigate(['/flights']);
          });
        },
        error: () => console.error('Error creating flight')
      });
    }
  }
}
