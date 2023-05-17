import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListReclamationComponent } from './reclamation/list-reclamation/list-reclamation.component';
import { ListInfractionComponent } from './infraction/list-infraction/list-infraction.component';
import { ListArreteComponent } from './arrete/list-arrete/list-arrete.component';
import { ExecutionArreteComponent } from './arrete/execution-arrete/execution-arrete.component';
import { ListSourceExecutionComponent } from './source-execution/list-source-execution/list-source-execution.component';
import { ListTypeDecisionComponent } from './type-decision/list-type-decision/list-type-decision.component';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AddArreteComponent } from './arrete/add-arrete/add-arrete.component';
import { ListEntiteComponent } from './entite/list-entite/list-entite.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'reclamations', component: ListReclamationComponent },
  // { path: 'reclamation', component: AddReclamationComponent },
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'acceuil', component: AcceuilComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reclamations', component: ListReclamationComponent },
      { path: 'infractions', component: ListInfractionComponent },
      { path: 'arretes', component: ListArreteComponent },
      { path: 'arrete', component: AddArreteComponent },
      { path: 'execution_arrete', component: ExecutionArreteComponent },
      { path: 'sources_execution', component: ListSourceExecutionComponent },
      { path: 'types_decision', component: ListTypeDecisionComponent },
      { path: 'departements', component: ListDepartementComponent },
      { path: 'employes', component: ListEmployeComponent },
      { path: 'entites', component: ListEntiteComponent },
      { path: 'users', component: ListUserComponent },
      { path: 'user', component: AddUserComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
