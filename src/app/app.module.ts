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
import { EmployeComponent } from './employe/employe/employe.component';


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
    EmployeComponent
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
  ],
  providers: [DatePipe, { provide: MAT_DIALOG_DATA, useValue: {}, },
    { provide: MatDialogRef, useValue: {} }, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
