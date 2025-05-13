import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Flight } from 'src/app/models/flight.model';  // Cambié 'User' por 'Baggage'
import { FlightService } from 'src/app/services/flight/flight.service';  // Cambié 'UserService' por 'BaggageService'
import { AlertService } from 'src/app/services/alert/alert.service'

@Component({
  selector: 'app-flight-list',  // Cambié el selector a 'app-baggage-list'
  imports: [MaterialModule, CommonModule],
  templateUrl: './flight-list.component.html',  // Cambié el nombre del archivo de 'user-list' a 'baggage-list'
  styleUrl: './flight-list.component.scss'  // Cambié el nombre del archivo de 'user-list' a 'baggage-list'
})
export class FlightListComponent {  // Cambié el nombre de la clase a BaggageListComponent
  flightList: Flight[] = [];  // Cambié 'userList' a 'baggageList'
 

  constructor(private flightService: FlightService, private router: Router){}

  ngOnInit(){
    this.getFlight();
  }

  // Método para cambiar el estado del equipaje (ejemplo: 'In Progress' a 'Completed')
  statusOptions: string[] = ["Scheduled", "In Progress", "Delayed", "Canceled"];

  changeFlightStatus(flight: Flight, nuevoEstado: string) {
  const flightId = flight.id;

  this.flightService.changeFlightStatus(flightId, nuevoEstado).subscribe({
    next: () => {
      alert(`Estado del vuelo actualizado a ${nuevoEstado}`);
      this.getFlight(); // refresca la lista
    },
    error: () => {
      alert("Error al cambiar el estado del vuelo");
    }
  });
}


  // Método para navegar al formulario de detalles de equipaje
  goToFlightForm(id?: string){
    if(id){
        this.router.navigate(['flights/flight', id]);  // Cambié la ruta de 'users/user' a 'baggages/baggage'
    }
  }

  // Método para navegar al formulario de creación de equipaje
  goToCreateFlightForm(){
    this.router.navigate(['flights/addFlight']);  // Cambié la ruta de 'users/addUser' a 'baggages/addBaggage'
  }
  

  // Método para obtener la lista de equipajes
  getFlight(){
    this.flightService.getFlights().subscribe(
      {
        next: (res) => {
          this.flightList = res;
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
  deleteFlight(id: string) {
    console.log('Eliminando vuelo con ID:', id);
    this.flightService.deleteFlight(id).subscribe({
      next: () => {
        new AlertService().SuccesAlert("Vuelo Eliminado", "Vuelo eliminado correctamente");
        this.getFlight();
      },
      error: (err) => {
        console.error('Error al eliminar vuelo:', err);
        alert("Ocurrió un error al eliminar el vuelo");
      }
    });
  }
}
