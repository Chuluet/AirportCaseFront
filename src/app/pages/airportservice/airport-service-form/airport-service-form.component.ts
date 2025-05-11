import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { airportService } from 'src/app/models/airportservice.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Airportservice } from 'src/app/services/airportService/airport.service';

@Component({
  selector: 'app-airport-service-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './airport-service-form.component.html',
  styleUrl: './airport-service-form.component.scss'
})
export class AirportServiceFormComponent {
  form!: FormGroup;
  editMode: boolean = false;
  serviceId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private airportservice: Airportservice,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required]],
      description: ['', Validators.required],
      location: ['', Validators.required],
      isActive: [true, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.serviceId = id;
        this.editMode = true;
        this.getServiceById(id);
      }
    });
  }

  getServiceById(id: string) {
    this.airportservice.getAirportServiceById(id).subscribe({
      next: (service: airportService) => {
        this.form.patchValue({
          name: service.name,
          type: service.type,
          description: service.description,
          location: service.location,
          isActive: service.isActive
        });
      },
      error: () => {
        console.error("Error fetching service");
      }
    });
  }

  saveServiceInfo() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert("There was an error mapping the data");
      return;
    }

    const serviceData: airportService = this.form.value;

    if (this.editMode && this.serviceId) {
      this.airportservice.udpateAirportService(this.serviceId, serviceData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Success", "The airport service has been modified successfully").then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/airportservices"]);
            }
          });
        },
        error: () => {
          console.error("Error updating service");
        }
      });
    }
  }
}