import { Routes } from '@angular/router';
import { BaggageListComponent } from './baggage-list/baggage-list.component';  

import { BaggageFormComponent } from './baggage-form/baggage-form.component'; 
import { CreateBaggageFormComponent } from './createbaggage-form/createbaggage-form.component';  
import { BaggageIncidentDetailsFormComponent } from './baggage-incident-details-form/baggage-incident-details-form.component';  

import { authGuard } from 'src/app/guards/auth.guard'; 


export const BaggageRoutes: Routes = [
  {
    path: '',
    children: [
    
      {
        path: '',
        component: BaggageListComponent,
      },
     
      {
        path: 'baggage/:id',
        component: BaggageFormComponent,
      },
    
      {
        path: 'addBaggage',
        component: CreateBaggageFormComponent,
      },
      {
        path: 'changeIncidentDetails/:id',
        component: BaggageIncidentDetailsFormComponent,
      },
     
      
      
    ],
    canActivate: [authGuard],  
  },
];