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
  constructor(private baggageService: BaggageService, private router: Router){}

  ngOnInit(){
    this.getBaggage();
  }


  statusOptions: string[] = ["Checked-in", "Arrived", "Lost", "In transit", "Delayed"];

  changeBaggageStatus(baggage: Baggage, nuevoEstado: string) {
  const baggageId = baggage.id;

  this.baggageService.changeBaggageStatus(baggageId, nuevoEstado).subscribe({
    next: () => {
      alert(`Estado del equipaje actualizado a ${nuevoEstado}`);
      this.getBaggage(); 
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
      this.getBaggage(); 
    },
    error: () => {
      alert("Error al cambiar los Incidentes del equipaje");
    }
  });
}

 
  goToBaggageForm(id?: string){
    if(id){
        this.router.navigate(['baggages/baggage', id]);  
    }
  }

  
  goToCreateBaggageForm(){
    this.router.navigate(['baggages/addBaggage']); 
  }
  goToBaggageIncidentDetailsForm(id: string): void {
  if(id){
        this.router.navigate(['baggages/changeIncidentDetails', id]);  
    }
}


  getBaggage(){
    this.baggageService.getBaggage().subscribe(
      {
        next: (res) => {
          this.baggageList = res;
        },
        error: (err) => {
          if(err.status === 403){
            localStorage.removeItem('AuthToken');
         
          }
        }
      }
    );
  }

  
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
