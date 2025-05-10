import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/alert/alert.service'

@Component({
  selector: 'app-user-list',
  imports: [MaterialModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userList: User[] = [];

  constructor(private userService: UserService, private router: Router){

  }

  ngOnInit(){
    this.getUser();
  }

  changeUserStatus(objUser: User){
    const userId = objUser.id;
    const estado = objUser.state === "Active" ? "Inactive" : "Active";
    this.userService.changeUserStatus(userId, estado).subscribe({
      next: () =>{
        alert("Se ha cambiado el estado del usuario");
        this.getUser()
      }, error: ()=>{
        alert("Error al cambiar el estado");
      }
    })
  }

  goToUserForm(id?: string){
    if(id){
        this.router.navigate(['users/user', id])
    }
  }
  goToCreateUserForm(){
    this.router.navigate(['users/addUser'])
  }


  getUser(){
    this.userService.getUsers().subscribe(
      {
        next: (res) =>{
          this.userList = res;
        },
        error: (err)=>{
          if(err.status === 403){
            localStorage.removeItem('AuthToken');
            // this.router
          }
        }
      }
    )
  }
  deleteUser(id: string) {
    console.log('Eliminando usuario con ID:', id);
    this.userService.deleteUser(id).subscribe({
      next: () => {
        new AlertService().SuccesAlert("Usuario Eliminado","Usuario eliminado correctamente");
        this.getUser();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        alert("Ocurrió un error al eliminar el usuario");
      }
    });
  }
  
}
