import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Baggage } from 'src/app/models/baggage.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { BaggageService } from 'src/app/services/baggage/baggage.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baggageService: BaggageService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  initForm(): void {
    this.form = this.fb.group({
      passenger: ['', Validators.required],
      tagNumber: ['', Validators.required],
      weight: [null, [Validators.required, Validators.min(0)]],
      dimensions: [''],
      state: ['In Progress']
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.baggageId = id;
        this.editMode = true;
        
      }
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
