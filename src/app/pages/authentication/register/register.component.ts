import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class Register implements OnInit {
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      state: ['Active']
    });
  }

  guardarUsuarioInfo(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.ConfirmationAlert("Error", "Please fill all required fields");
      return;
    }

    const userData: User = this.form.value;

    this.userService.addUser(userData).subscribe({
      next: () => {
        this.alertService.SuccesAlert("Success", "User successfully created").then(result => {
          if (result.isConfirmed) {
            this.router.navigate(["/users"]);
          }
        });
      },
      error: () => {
        console.error("Error creating user");
      }
    });
  }
}
