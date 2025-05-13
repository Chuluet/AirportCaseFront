import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Flight } from 'src/app/models/flight.model';  
import { FlightService } from 'src/app/services/flight/flight.service';  
import { AlertService } from 'src/app/services/alert/alert.service';

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

  changeFlightStatus(flight: Flight, newStatus: string) {
    const flightId = flight.id;

    this.flightService.changeFlightStatus(flightId, newStatus).subscribe({
      next: () => {
        new AlertService().SuccesAlert("Status Updated", `The flight status has been changed to ${newStatus}`);
        this.getFlight(); 
      },
      error: () => {
        new AlertService().ErrorAlert("Error", "Failed to change flight status");
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
    console.log('Deleting flight with ID:', id);
    this.flightService.deleteFlight(id).subscribe({
      next: () => {
        new AlertService().SuccesAlert("Flight Deleted", "Flight has been deleted successfully");
        this.getFlight();
      },
      error: (err) => {
        console.error('Error deleting flight:', err);
        alert("An error occurred while deleting the flight");
      }
    });
  }
}
