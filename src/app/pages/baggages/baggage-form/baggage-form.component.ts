import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Baggage } from 'src/app/models/baggage.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { BaggageService } from 'src/app/services/baggage/baggage.service';
import { Passenger } from 'src/app/models/passenger.model';
import { Flight } from 'src/app/models/flight.model';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { FlightService } from 'src/app/services/flight/flight.service';

@Component({
  selector: 'app-baggage-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './baggage-form.component.html',
  styleUrl: './baggage-form.component.scss'
})
export class BaggageFormComponent {
  form!: FormGroup;
  editMode = false;
  baggageId!: string;
  passengers: Passenger[] = [];
  flights: Flight[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baggageService: BaggageService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private flightService: FlightService,
    private passengerService: PassengerService
  ) {}

  initForm(): void {
    this.form = this.fb.group({
      passengerFk: ['', Validators.required],
      tagNumber: ['', Validators.required],
      weight: [null, [Validators.required, Validators.min(0)]],
      dimensions: [''],
      state: ['In Progress']
    });
  }

  ngOnInit(): void {
    this.loadFlights();
    this.loadPassengers();
    this.initForm();
    
  

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.baggageId = id;
        this.editMode = true;
        
      }
    });
  }
  loadPassengers(): void {
      this.passengerService.getPassenger().subscribe({
        next: (data: Passenger[]) => this.passengers = data,
        error: () => console.error('Error al cargar pasajeros')
      });
    }
    
    loadFlights(): void {
      this.flightService.getFlights().subscribe({
        next: (data: Flight[]) => this.flights = data,
        error: () => console.error('Error al cargar vuelos')
      });
    }


  guardarBaggageInfo() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert("Hubo un error al validar los datos del formulario");
      return;
    }

    const baggageData: Baggage = this.form.value;

    if (this.editMode && this.baggageId) {
      this.baggageService.updateBaggage(this.baggageId, baggageData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Excelente", "El equipaje ha sido modificado correctamente").then(result => {
            if (result.isConfirmed) {
              this.router.navigate(['/baggage']);
            }
          });
        },
        error: () => {
          console.error("Error al actualizar el equipaje");
        }
      });
    } else {
      this.baggageService.addBaggage(baggageData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Excelente", "El equipaje ha sido creado correctamente").then(result => {
            if (result.isConfirmed) {
              this.router.navigate(['/baggage']);
            }
          });
        },
        error: () => {
          console.error("Error al crear el equipaje");
        }
      });
    }
  }
}
