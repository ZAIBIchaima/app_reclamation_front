import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatePipe } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListReclamationComponent } from './reclamation/list-reclamation/list-reclamation.component';
import { AddReclamationComponent } from './reclamation/add-reclamation/add-reclamation.component';
import { AddInfractionComponent } from './infraction/add-infraction/add-infraction.component';
import { ListInfractionComponent } from './infraction/list-infraction/list-infraction.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'reclamations', component: ListReclamationComponent },

  //{ path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'acceuil', component: AcceuilComponent, children: [
      { path: 'reclamations', component: ListReclamationComponent },
      { path: 'reclamation', component: AddReclamationComponent },
      { path: 'infractions', component: ListInfractionComponent },
      { path: 'infraction', component: AddInfractionComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
