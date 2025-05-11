import { Routes } from '@angular/router';
import { PersonnelListComponent } from './personnel-list/personnel-list.component';
import { PersonnelFormComponent } from './personnel-form/personnel-form.component';
import { CreatepersonnelFormComponent } from './createpersonnel-form/createpersonnel-form.component';
import { authGuard } from 'src/app/guards/auth.guard';



export const personnelRoutes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: PersonnelListComponent
        },
         {
            path: 'personnel/:id',
            component: PersonnelFormComponent
        },
        {
            path: 'addPersonnel',
            component: CreatepersonnelFormComponent
        }
    ], canActivate: [authGuard]
}]