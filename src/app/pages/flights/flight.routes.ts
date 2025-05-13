import { Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';  

import { FlightFormComponent } from './flight-form/flight-form.component'; 
import { CreateFlightFormComponent } from './createflight-form/createflight-form.component';  


import { authGuard } from 'src/app/guards/auth.guard'; 


export const FlightRoutes: Routes = [
  {
    path: '',
    children: [
    
      {
        path: '',
        component: FlightListComponent,
      },
     
      {
        path: 'flight/:id',
        component: FlightFormComponent,
      },
    
      {
        path: 'addFlight',
        component: CreateFlightFormComponent,
      },
       
    ],
    canActivate: [authGuard],  
  },
];