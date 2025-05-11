import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { airportService } from 'src/app/models/airportservice.model';
import { Airportservice } from 'src/app/services/airportService/airport.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-airport-service-list',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './airport-service-list.component.html',
  styleUrl: './airport-service-list.component.scss'
})
export class AirportServiceListComponent {
  serviceList: airportService[] = [];

  constructor(
    private aService: Airportservice,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getServices();
  }

  changeServiceStatus(serviceId: string, isActive: boolean) {
    if (!serviceId) return;

    const newState = !isActive;
    this.aService.changeAirportServiceStatus(serviceId, newState).subscribe({
      next: () => {
        this.alertService.SuccesAlert("Status Updated", "The service status was changed successfully");
        this.getServices();
      },
      error: (err) => {
        console.error(err);
        this.alertService.ConfirmationAlert("Error", "The service status could not be changed");
      }
    });
  }

  goToServiceForm(id?: string) {
    if (id) {
      this.router.navigate(['airportservices/airportservice', id])
    }
  }

  getServices() {
    this.aService.getAirportService().subscribe({
      next: (res) => {
        this.serviceList = res;
      },
      error: (err) => {
        if (err.status === 403) {
          localStorage.removeItem('AuthToken');
          this.router.navigate(['/login']);
        }
        this.alertService.ConfirmationAlert("Error", "Could not fetch services");
      }
    });
  }

  deleteService(serviceId?: string) {
    if (!serviceId) return;

    this.alertService.ConfirmationAlert(
      "Delete service?",
      "This action cannot be undone"
    ).then((result) => {
      if (result.isConfirmed) {
        this.aService.deleteAirportService(serviceId).subscribe({
          next: () => {
            this.alertService.SuccesAlert("Service Deleted", "The service was deleted successfully");
            this.getServices();
          },
          error: (err) => {
            console.error(err);
            this.alertService.ConfirmationAlert("Error", "The service could not be deleted");
          }
        });
      }
    });
  }
}
