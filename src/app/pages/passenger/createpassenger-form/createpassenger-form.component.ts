import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Passenger } from 'src/app/models/passenger.model';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-createpassenger-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './createpassenger-form.component.html',
  styleUrl: './createpassenger-form.component.scss'
})
export class CreatepassengerFormComponent {
 form!: FormGroup;
   loading = false;
 
   constructor(
     private router: Router,
     private service: PassengerService,
     private fb: FormBuilder,
     private alertService: AlertService
   ) { }
 
   ngOnInit(): void {
     this.initForm();
   }
 
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
 
   save(): void {
     if (this.form.invalid) {
       this.form.markAllAsTouched();
       this.alertService.ConfirmationAlert('Error', 'Please fill all required fields');
       return;
     }
 
     this.loading = true;
     const passengerData: Passenger = this.form.value;
 
     this.service.addPassenger(passengerData).subscribe({
       next: () => {
         this.alertService.SuccesAlert('Success', 'Passenger created successfully').then(result => {
           if (result.isConfirmed) {
             this.router.navigate(["/passengers"]);
           }
         });
       },
       error: (error) => {
         console.error("Error creating Passenger:", error);
         this.alertService.ConfirmationAlert('Error', 'Failed to create passenger');
       },
       complete: () => this.loading = false
     });
   }
}