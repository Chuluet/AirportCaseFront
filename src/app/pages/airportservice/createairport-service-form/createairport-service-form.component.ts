import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { airportService } from 'src/app/models/airportservice.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Airportservice } from 'src/app/services/airportService/airport.service';

@Component({
  selector: 'app-create-airport-service-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './createairport-service-form.component.html',
  styleUrl: './createairport-service-form.component.scss'
})
export class CreateAirportServiceFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private service: Airportservice,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      isActive: [true, Validators.required]
    });
  }

  saveService(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.ConfirmationAlert('Error', 'Please fill all required fields');
      return;
    }

    this.loading = true;
    const serviceData: airportService = this.form.value;

    this.service.addAirportService(serviceData).subscribe({
      next: () => {
        this.alertService.SuccesAlert('Success', 'Service created successfully').then(result => {
          if (result.isConfirmed) {
            this.router.navigate(["/airportservices"]);
          }
        });
      },
      error: (error) => {
        console.error("Error creating service:", error);
        this.alertService.ConfirmationAlert('Error', 'Failed to create service');
      },
      complete: () => this.loading = false
    });
  }
}