import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss'
})
export class FlightFormComponent {
  form!: FormGroup;
  editMode = false;
  flightId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.flightId = id;
        this.editMode = true;

        
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
      route: [''],
      status: ['Scheduled'],
      boardingGate: [''],
      aircraftType: [''],
      baggageClaim: ['']
    });
  }

  guardarFlight() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert("Hubo un error al validar los datos del formulario");
      return;
    }

    const flightData: Flight = this.form.value;

    if (this.editMode && this.flightId) {
      this.flightService.updateFlight(this.flightId, flightData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Excelente", "El vuelo ha sido modificado correctamente").then(result => {
            if (result.isConfirmed) {
              this.router.navigate(['/flight']);
            }
          });
        },
        error: () => {
          console.error("Error al actualizar el vuelo");
        }
      });
    } else {
      this.flightService.addFlight(flightData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Excelente", "El vuelo ha sido creado correctamente").then(result => {
            if (result.isConfirmed) {
              this.router.navigate(['/flight']);
            }
          });
        },
        error: () => {
          console.error("Error al crear el vuelo");
        }
      });
    }
  }
}
