import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Personnel } from 'src/app/models/personnel.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';

@Component({
  selector: 'app-createpersonnel-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './createpersonnel-form.component.html',
  styleUrl: './createpersonnel-form.component.scss'
})
export class CreatepersonnelFormComponent {
 form!: FormGroup;
   loading = false;
 
   constructor(
     private router: Router,
     private service: PersonnelService,
     private fb: FormBuilder,
     private alertService: AlertService
   ) { }
 
   ngOnInit(): void {
     this.initForm();
   }
 
   initForm(): void {
    this.form = this.fb.group({
      personId: ['', [Validators.required]],
      name: ['', Validators.required],
      role: ['', [Validators.required]],
      email: ['', Validators.required],
      phone: ['', Validators.required],
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
     const personnelData: Personnel = this.form.value;
 
     this.service.addPersonnel(personnelData).subscribe({
       next: () => {
         this.alertService.SuccesAlert('Success', 'Personnel created successfully').then(result => {
           if (result.isConfirmed) {
             this.router.navigate(["/personnel"]);
           }
         });
       },
       error: (error) => {
         console.error("Error creating personnel:", error);
         this.alertService.ConfirmationAlert('Error', 'Failed to create personnel');
       },
       complete: () => this.loading = false
     });
   }
}