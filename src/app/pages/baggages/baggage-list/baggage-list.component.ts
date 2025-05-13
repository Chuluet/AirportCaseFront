import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Baggage } from 'src/app/models/baggage.model';  
import { BaggageService } from 'src/app/services/baggage/baggage.service';  
import { AlertService } from 'src/app/services/alert/alert.service'

@Component({
  selector: 'app-baggage-list',  
  imports: [MaterialModule, CommonModule],
  templateUrl: './baggage-list.component.html',  
  styleUrl: './baggage-list.component.scss' 
})
export class BaggageListComponent {  
  baggageList: Baggage[] = [];  

  constructor(
    private baggageService: BaggageService, 
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getBaggage();
  }

  statusOptions: string[] = ["Checked-in", "Arrived", "Lost", "In transit", "Delayed"];

  changeBaggageStatus(baggage: Baggage, newStatus: string) {
    const baggageId = baggage.id;

    this.baggageService.changeBaggageStatus(baggageId, newStatus).subscribe({
      next: () => {
        alert(`Baggage status updated to ${newStatus}`);
        this.getBaggage(); 
      },
      error: () => {
        alert("Error updating baggage status");
      }
    });
  }

  changeBaggageIncidentDetails(baggage: Baggage, newDetails: string) {
    const baggageId = baggage.id;

    this.baggageService.changeBaggageIncidentDetails(baggageId, newDetails).subscribe({
      next: () => {
        alert(`Baggage incident details updated to ${newDetails}`);
        this.getBaggage(); 
      },
      error: () => {
        alert("Error updating baggage incident details");
      }
    });
  }

  goToBaggageForm(id?: string) {
    if (id) {
      this.router.navigate(['baggages/baggage', id]);  
    }
  }

  goToCreateBaggageForm() {
    this.router.navigate(['baggages/addBaggage']); 
  }

  goToBaggageIncidentDetailsForm(id: string): void {
    if (id) {
      this.router.navigate(['baggages/changeIncidentDetails', id]);  
    }
  }

  getBaggage() {
    this.baggageService.getBaggage().subscribe({
      next: (res) => {
        this.baggageList = res;
      },
      error: (err) => {
        if (err.status === 403) {
          localStorage.removeItem('AuthToken');
          // You might want to redirect to login here
        }
      }
    });
  }

  deleteBaggage(id: string) {
    console.log('Deleting baggage with ID:', id);
    this.baggageService.deleteBaggage(id).subscribe({
      next: () => {
        this.alertService.SuccesAlert("Baggage Deleted", "Baggage deleted successfully");
        this.getBaggage();
      },
      error: (err) => {
        console.error('Error deleting baggage:', err);
        alert("An error occurred while deleting the baggage");
      }
    });
  }
}
