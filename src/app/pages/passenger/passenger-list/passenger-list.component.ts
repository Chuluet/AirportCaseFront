import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Passenger } from 'src/app/models/passenger.model';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './passenger-list.component.html',
  styleUrl: './passenger-list.component.scss'
})
export class PassengerListComponent {
  passengerList: Passenger[] = [];

  constructor(
    private pService: PassengerService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getPassenger();
  }

  changePassengerStatus(id: string, isActive: boolean) {
    if (!id) return;

    const newState = !isActive;
    this.pService.changePassenger(id, newState).subscribe({
      next: () => {
        this.alertService.SuccesAlert("Status Updated", "The passenger status was changed successfully");
        this.getPassenger();
      },
      error: (err) => {
        console.error(err);
        this.alertService.ConfirmationAlert("Error", "The Passenger status could not be changed");
      }
    });
  }

  goToPassengerForm(id?: string) {
    if (id) {
      this.router.navigate(['passengers/passenger/', id])
    }
  }
  goToSCreateForm() {
    this.router.navigate(['passengers/addPassenger'])
  }
  getPassenger() {
    this.pService.getPassenger().subscribe({
      next: (res) => {
        this.passengerList = res;
      },
      error: (err) => {
        if (err.status === 403) {
          localStorage.removeItem('AuthToken');
          this.router.navigate(['/login']);
        }
        this.alertService.ConfirmationAlert("Error", "Could not fetch passenger data");
      }
    });
  }

  deletePassenger(id?: string) {
    if (!id) return;

    this.alertService.ConfirmationAlert(
      "Delete passenger?",
      "This action cannot be undone"
    ).then((result) => {
      if (result.isConfirmed) {
        this.pService.deletePassenger(id).subscribe({
          next: () => {
            this.alertService.SuccesAlert("Passenger Deleted", "The passenger was deleted successfully");
            this.getPassenger();
          },
          error: (err) => {
            console.error(err);
            this.alertService.ConfirmationAlert("Error", "The passenger could not be deleted");
          }
        });
      }
    });
  }
}

