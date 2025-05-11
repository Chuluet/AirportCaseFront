import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Personnel } from 'src/app/models/personnel.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';

@Component({
  selector: 'app-personnel-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './personnel-form.component.html',
  styleUrl: './personnel-form.component.scss'
})
export class PersonnelFormComponent {
  form!: FormGroup;
  editMode: boolean = false;
  personnelId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PersonnelService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

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

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.personnelId = id;
        this.editMode = true;
        this.getPersonnelById(id);
      }
    });
  }

  getPersonnelById(id: string) {
    this.service.getPersonnelById(id).subscribe({
      next: (personnel: Personnel) => {
        this.form.patchValue({
          personId: personnel.personId,
          name: personnel.name,
          role: personnel.role,
          email: personnel.email,
          phone: personnel.phone,
          isActive: personnel.isActive
        });
      },
      error: () => {
        console.error("Error fetching personnel");
      }
    });
  }

  savePersonnelInfo() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert("There was an error mapping the data");
      return;
    }

    const personnelData: Personnel = this.form.value;

    if (this.editMode && this.personnelId) {
      this.service.udpatePersonnel(this.personnelId, personnelData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Success", "Personnel has been modified successfully").then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/personnel"]);
            }
          });
        },
        error: () => {
          console.error("Error updating personnel");
        }
      });
    }
  }
}