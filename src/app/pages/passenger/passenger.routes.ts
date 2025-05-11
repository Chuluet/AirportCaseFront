import { Routes } from '@angular/router';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { PassengerFormComponent } from './passenger-form/passenger-form.component';
import { CreatepassengerFormComponent } from './createpassenger-form/createpassenger-form.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { C } from '@angular/cdk/keycodes';



export const passengerRoutes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: PassengerListComponent
        },
         {
            path: 'passenger/:id',
            component: PassengerFormComponent
        },
        {
            path: 'addPassenger',
            component: CreatepassengerFormComponent
        }
    ], canActivate: [authGuard]
}]