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

@Component({
  selector: 'app-baggage-incident-details-form',
  templateUrl: './baggage-incident-details-form.component.html',
  styleUrls: ['./baggage-incident-details-form.component.scss'],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule]
})
export class BaggageIncidentDetailsFormComponent implements OnInit {
  form!: FormGroup;
  baggageId: string;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private baggageService: BaggageService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.baggageId = id;
        this.editMode = true;
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      incidentDetails: ['', Validators.required]
    });
  }

  saveIncidentDetails(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const incidentDetails = this.form.value.incidentDetails;
    if (this.editMode) {
      this.baggageService.changeBaggageIncidentDetails(this.baggageId, incidentDetails).subscribe({
        next: () => {
          this.alertService.SuccesAlert('Success', 'Incident details updated successfully').then(result => {
            if (result.isConfirmed) {
              this.router.navigate(['/baggage']);
            }
          });
        },
        error: () => {
          console.error("Error updating incident details");
        }
      });
    }
  }
}
