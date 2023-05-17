import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListReclamationComponent } from './reclamation/list-reclamation/list-reclamation.component';
import { LoginComponent } from './login/login.component';
import { AddReclamationComponent } from './reclamation/add-reclamation/add-reclamation.component';

import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListInfractionComponent } from './infraction/list-infraction/list-infraction.component';
import { AddInfractionComponent } from './infraction/add-infraction/add-infraction.component';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { AddEmployeComponent } from './employe/add-employe/add-employe.component';
import { ListArreteComponent } from './arrete/list-arrete/list-arrete.component';
import { AddArreteComponent } from './arrete/add-arrete/add-arrete.component';
import { ExecutionArreteComponent } from './arrete/execution-arrete/execution-arrete.component';
import { ListSourceExecutionComponent } from './source-execution/list-source-execution/list-source-execution.component';
import { AddSourceExecutionComponent } from './source-execution/add-source-execution/add-source-execution.component';
import { ListTypeDecisionComponent } from './type-decision/list-type-decision/list-type-decision.component';
import { AddTypeDecisionComponent } from './type-decision/add-type-decision/add-type-decision.component';
import { CourComponent } from './arrete/cour/cour.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ListEntiteComponent } from './entite/list-entite/list-entite.component';
import { AddEntiteComponent } from './entite/add-entite/add-entite.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';



const materialModules = [
  MatIconModule,
  MatDialogModule,
  MatToolbarModule,
];


@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    ListReclamationComponent,
    LoginComponent,
    AddReclamationComponent,
    ListInfractionComponent,
    AddInfractionComponent,
    ListDepartementComponent,
    AddDepartementComponent,
    ListEmployeComponent,
    AddEmployeComponent,
    ListArreteComponent,
    AddArreteComponent,
    ExecutionArreteComponent,
    ListSourceExecutionComponent,
    AddSourceExecutionComponent,
    ListTypeDecisionComponent,
    AddTypeDecisionComponent,
    CourComponent,
    DashboardComponent,
    ListEntiteComponent,
    AddEntiteComponent,
    ListUserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    materialModules,
    HttpClientModule,
    NgxPaginationModule,
    ChartsModule,
  ],
  providers: [DatePipe, { provide: MAT_DIALOG_DATA, useValue: {}, },
    { provide: MatDialogRef, useValue: {} }, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
