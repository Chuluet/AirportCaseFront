import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Passenger} from 'src/app/models/passenger.model';   
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-passenger-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './passenger-form.component.html',
  styleUrl: './passenger-form.component.scss'
})
export class PassengerFormComponent {
  form!: FormGroup;
  editMode: boolean = false;
  passengerId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PassengerService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      passportId: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      seatPreference: ['', Validators.required],
      mealPreference: ['', Validators.required],
      isActive: [true, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.passengerId = id;
        this.editMode = true;
        this.getPassengerById(id);
      }
    });
  }

  getPassengerById(id: string) {
    this.service.getPassengerById(id).subscribe({
      next: (passenger: Passenger) => {
        this.form.patchValue({
          name: passenger.name,
          passportId: passenger.passportId,
          email: passenger.email,
          phone: passenger.phone,
          seatPreference: passenger.seatPreference,
          mealPreference: passenger.mealPreference,
          isActive: passenger.isActive
        });
      },
      error: () => {
        console.error("Error fetching Passenger data");
      }
    });
  }

  savePassengerInfo() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert("There was an error mapping the data");
      return;
    }

    const passengerData: Passenger = this.form.value;

    if (this.editMode && this.passengerId) {
      this.service.udpatePassenger(this.passengerId, passengerData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Success", "Passenger has been modified successfully").then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/passengers"]);
            }
          });
        },
        error: () => {
          console.error("Error updating passenger");
        }
      });
    }
  }
}