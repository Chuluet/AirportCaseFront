import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Personnel } from 'src/app/models/personnel.model';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-personnel-list',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './personnel-list.component.html',
  styleUrl: './personnel-list.component.scss'
})
export class PersonnelListComponent {
  personnelList: Personnel[] = [];

  constructor(
    private pService: PersonnelService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getPersonnel();
  }

  changeServiceStatus(id: string, isActive: boolean) {
    if (!id) return;

    const newState = !isActive;
    this.pService.changePersonnel(id, newState).subscribe({
      next: () => {
        this.alertService.SuccesAlert("Status Updated", "The personnel status was changed successfully");
        this.getPersonnel();
      },
      error: (err) => {
        console.error(err);
        this.alertService.ConfirmationAlert("Error", "The personnel status could not be changed");
      }
    });
  }

  goToPersonnelForm(id?: string) {
    if (id) {
      this.router.navigate(['personnel/personnel/', id])
    }
  }
  goToSCreateForm() {
    this.router.navigate(['personnel/addPersonnel'])
  }
  getPersonnel() {
    this.pService.getPersonnel().subscribe({
      next: (res) => {
        this.personnelList = res;
      },
      error: (err) => {
        if (err.status === 403) {
          localStorage.removeItem('AuthToken');
          this.router.navigate(['/login']);
        }
        this.alertService.ConfirmationAlert("Error", "Could not fetch personnel data");
      }
    });
  }

  deletePersonnel(id?: string) {
    if (!id) return;

    this.alertService.ConfirmationAlert(
      "Delete personnel?",
      "This action cannot be undone"
    ).then((result) => {
      if (result.isConfirmed) {
        this.pService.deletePersonnel(id).subscribe({
          next: () => {
            this.alertService.SuccesAlert("Personnel Deleted", "The personnel was deleted successfully");
            this.getPersonnel();
          },
          error: (err) => {
            console.error(err);
            this.alertService.ConfirmationAlert("Error", "The personnel could not be deleted");
          }
        });
      }
    });
  }
}
