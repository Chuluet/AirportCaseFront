import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AlertService } from 'src/app/services/alert/alert.service';
import { BaggageService } from 'src/app/services/baggage/baggage.service';
import { Baggage } from 'src/app/models/baggage.model';
import { MatIconModule } from '@angular/material/icon'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-createbaggage-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule,MatIconModule,FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './createbaggage-form.component.html',
  styleUrl: './createbaggage-form.component.scss'
})
export class CreateBaggageFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  baggageId = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private baggageService: BaggageService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.baggageId = id;
        this.editMode = true;
        this.getBaggage(id);
      }
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
      incidentDetails: ['']
    });
  }

  getBaggage(id: string): void {
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
          console.warn('Equipaje no encontrado');
        }
      },
      error: () => console.error('Error al obtener los equipajes')
    });
  }
  

  guardarBaggage(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    const baggageData: Baggage = this.form.value;

    if (this.editMode && this.baggageId) {
      this.baggageService.updateBaggage(this.baggageId, baggageData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Éxito", "Equipaje actualizado correctamente").then(result => {
            if (result.isConfirmed) this.router.navigate(['/baggages']);
          });
        },
        error: () => console.error('Error al actualizar equipaje')
      });
    } else {
      this.baggageService.addBaggage(baggageData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Éxito", "Equipaje creado correctamente").then(result => {
            if (result.isConfirmed) this.router.navigate(['/baggages']);
          });
        },
        error: () => console.error('Error al crear equipaje')
      });
    }
  }
}
