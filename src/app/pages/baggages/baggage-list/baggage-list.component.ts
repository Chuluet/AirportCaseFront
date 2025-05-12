import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Baggage } from 'src/app/models/baggage.model';  // Cambié 'User' por 'Baggage'
import { BaggageService } from 'src/app/services/baggage/baggage.service';  // Cambié 'UserService' por 'BaggageService'
import { AlertService } from 'src/app/services/alert/alert.service'

@Component({
  selector: 'app-baggage-list',  // Cambié el selector a 'app-baggage-list'
  imports: [MaterialModule, CommonModule],
  templateUrl: './baggage-list.component.html',  // Cambié el nombre del archivo de 'user-list' a 'baggage-list'
  styleUrl: './baggage-list.component.scss'  // Cambié el nombre del archivo de 'user-list' a 'baggage-list'
})
export class BaggageListComponent {  // Cambié el nombre de la clase a BaggageListComponent
  baggageList: Baggage[] = [];  // Cambié 'userList' a 'baggageList'

  constructor(private baggageService: BaggageService, private router: Router){}

  ngOnInit(){
    this.getBaggage();
  }

  // Método para cambiar el estado del equipaje (ejemplo: 'In Progress' a 'Completed')
  statusOptions: string[] = ["Checked-in", "Arrived", "Lost", "In transit", "Delayed"];

  changeBaggageStatus(baggage: Baggage, nuevoEstado: string) {
  const baggageId = baggage.id;

  this.baggageService.changeBaggageStatus(baggageId, nuevoEstado).subscribe({
    next: () => {
      alert(`Estado del equipaje actualizado a ${nuevoEstado}`);
      this.getBaggage(); // refresca la lista
    },
    error: () => {
      alert("Error al cambiar el estado del equipaje");
    }
  });
}
changeBaggageIncidentDetails(baggage: Baggage, nuevoDetalles: string) {
  const baggageId = baggage.id;

  this.baggageService.changeBaggageIncidentDetails(baggageId, nuevoDetalles).subscribe({
    next: () => {
      alert(`Incidentes del equipaje actualizado a ${nuevoDetalles}`);
      this.getBaggage(); // refresca la lista
    },
    error: () => {
      alert("Error al cambiar los Incidentes del equipaje");
    }
  });
}

  // Método para navegar al formulario de detalles de equipaje
  goToBaggageForm(id?: string){
    if(id){
        this.router.navigate(['baggages/baggage', id]);  // Cambié la ruta de 'users/user' a 'baggages/baggage'
    }
  }

  // Método para navegar al formulario de creación de equipaje
  goToCreateBaggageForm(){
    this.router.navigate(['baggages/addBaggage']);  // Cambié la ruta de 'users/addUser' a 'baggages/addBaggage'
  }
  goToBaggageIncidentDetailsForm(id: string): void {
  if(id){
        this.router.navigate(['baggages/changeIncidentDetails', id]);  // Cambié la ruta de 'users/user' a 'baggages/baggage'
    }
}

  // Método para obtener la lista de equipajes
  getBaggage(){
    this.baggageService.getBaggage().subscribe(
      {
        next: (res) => {
          this.baggageList = res;
        },
        error: (err) => {
          if(err.status === 403){
            localStorage.removeItem('AuthToken');
            // this.router
          }
        }
      }
    );
  }

  // Método para eliminar un equipaje
  deleteBaggage(id: string) {
    console.log('Eliminando equipaje con ID:', id);
    this.baggageService.deleteBaggage(id).subscribe({
      next: () => {
        new AlertService().SuccesAlert("Equipaje Eliminado", "Equipaje eliminado correctamente");
        this.getBaggage();
      },
      error: (err) => {
        console.error('Error al eliminar equipaje:', err);
        alert("Ocurrió un error al eliminar el equipaje");
      }
    });
  }
}
