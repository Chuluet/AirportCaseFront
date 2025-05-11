import { Routes } from '@angular/router';
import { AirportServiceListComponent } from './airport-service-list/airport-service-list.component';
import { AirportServiceFormComponent } from './airport-service-form/airport-service-form.component';
import { authGuard } from 'src/app/guards/auth.guard';



export const AirportserviceRoutes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: AirportServiceListComponent
        },
        {
            path: 'airportservice/:id',
            component: AirportServiceFormComponent
        }
    ], canActivate: [authGuard]
}]