import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router, private userService: UserService) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  addUser() {
    if(this.form.invalid) return;

    const user: User = {
      name: this.form.value.uname!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      state: "Active"
    }

    this.userService.addUser(user).subscribe({
      next:(res)=>{
        console.log(res);
        debugger;
        console.log(res.id)
        alert("Usuario registrado correctamente")
        this.router.navigate(['/authentication/login']);
      },
      error:(err)=>{
        console.log(err);
        alert("Error al registrar el usuario")
      }
    })
  }
}
