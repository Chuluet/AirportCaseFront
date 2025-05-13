import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Flight } from 'src/app/models/flight.model';  
import { FlightService } from 'src/app/services/flight/flight.service';  
import { AlertService } from 'src/app/services/alert/alert.service'

@Component({
  selector: 'app-flight-list',  
  imports: [MaterialModule, CommonModule],
  templateUrl: './flight-list.component.html',  
  styleUrl: './flight-list.component.scss'  
})
export class FlightListComponent {  
  flightList: Flight[] = [];  
 

  constructor(private flightService: FlightService, private router: Router){}

  ngOnInit(){
    this.getFlight();
  }


  statusOptions: string[] = ["Scheduled", "In Progress", "Delayed", "Canceled"];

  changeFlightStatus(flight: Flight, nuevoEstado: string) {
  const flightId = flight.id;

  this.flightService.changeFlightStatus(flightId, nuevoEstado).subscribe({
    next: () => {
      new AlertService().SuccesAlert("Estado actualizado", `El estado del vuelo ha sido cambiado a ${nuevoEstado}`);
      this.getFlight(); 
    },
    error: () => {
      new AlertService().ErrorAlert("Error", "No se pudo cambiar el estado del vuelo");
    }
  });
}


 
  goToFlightForm(id?: string){
    if(id){
        this.router.navigate(['flights/flight', id]); 
    }
  }

 
  goToCreateFlightForm(){
    this.router.navigate(['flights/addFlight']); 
  }
  

 
  getFlight(){
    this.flightService.getFlights().subscribe(
      {
        next: (res) => {
          this.flightList = res;
        },
        error: (err) => {
          if(err.status === 403){
            localStorage.removeItem('AuthToken');
            
          }
        }
      }
    );
  }

 
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
