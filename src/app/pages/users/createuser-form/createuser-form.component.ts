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
  templateUrl: './createuser-form.component.html',
  styleUrl: './createuser-form.component.scss'
})
export class CreateUserFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.editMode = true;
        this.getUserById(id);
        this.form.get('password')?.clearValidators(); // No pedimos contraseña en edición
        this.form.get('password')?.updateValueAndValidity();
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      state: ['Active']
    });
  }

  getUserById(id: string): void {
    this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.form.patchValue({
          name: user.name,
          email: user.email,
          state: user.state
        });
      },
      error: () => {
        console.error("Error al obtener el usuario");
      }
    });
  }

  guardarUsuarioInfo(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    const userData: User = this.form.value;

    if (this.editMode && this.userId) {
      this.userService.udpateUser(this.userId, userData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Éxito", "Usuario actualizado correctamente").then(result => {
            if (result.isConfirmed) {
              this.router.navigate(["/users"]);
            }
          });
        },
        error: () => {
          console.error("Error al actualizar usuario");
        }
      });
    } else {
      this.userService.addUser(userData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Éxito", "Usuario creado correctamente").then(result => {
            if (result.isConfirmed) {
              this.router.navigate(["/users"]);
            }
          });
        },
        error: () => {
          console.error("Error al crear usuario");
        }
      });
    }
  }
}
