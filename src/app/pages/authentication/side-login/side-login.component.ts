import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';
@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  constructor(private router: Router, private authService: AuthService) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }
  goToRegister() {
   this.router.navigate(['authentication/register'])
  }
  submit() {
    const { uname, password } = this.form.value;
    this.authService.authenticate(uname || '', password || '').subscribe({
      next: (res) => {
        localStorage.setItem("AuthToken", res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        new AlertService().ErrorAlert("Error", "Invalid credentials");
      }

    })
  }
}
