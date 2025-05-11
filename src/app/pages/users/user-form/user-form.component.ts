import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  form!: FormGroup;
  editMode: boolean | false;
  userId: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private userService: UserService, 
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      state: ['Active']
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.editMode = true;
        this.getuserById(id);
      }
    });
  }

  getuserById(id: string) {
    this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.form.patchValue({
          name: user.name,
          email: user.email,
          state: user.state
        });
      },
      error: () => {
        console.log("Something went wrong");
      }
    });
  }

  guardarUsuarioInfo() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert("There was an error mapping the data");
      return;
    }

    const userData: User = this.form.value;

    if (this.editMode && this.userId) {
      this.userService.udpateUser(this.userId, userData).subscribe({
        next: (user: User) => {
          this.alertService.SuccesAlert("Success", "User has been updated successfully").then((result) => {
            if (result.isConfirmed)
              this.router.navigate(["/users"]);
          });
        },
        error: () => {
          console.log("Something went wrong");
        }
      });
    }
  }
}
