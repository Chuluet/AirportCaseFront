import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [authGuard], // ⬅️ Protege todas las rutas hijas de FullComponent
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/user.routes').then((m) => m.UserRoutes),
      },
      {
        path: 'baggages',
        loadChildren: () =>
          import('./pages/baggages/baggage.routes').then((m) => m.BaggageRoutes),
      },
      {
        path: 'flights',
        loadChildren: () =>
          import('./pages/flights/flight.routes').then((m) => m.FlightRoutes),
      },
      {
        path: 'airportservices',
        loadChildren: () =>
          import('./pages/airportservice/airportservice.routes').then((m) => m.AirportserviceRoutes),
      },
      {
        path: 'personnel',
        loadChildren: () =>
          import('./pages/personnel/personnel.routes').then((m) => m.personnelRoutes),
      },
      {
        path: 'passengers',
        loadChildren: () =>
          import('./pages/passenger/passenger.routes').then((m) => m.passengerRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
