import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { CountEtat } from '../models/countEtat';
import { InfractionService } from '../services/infraction.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  name: any = '';
  content: string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  iduser: number;


  constructor(private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {

    //this.name = localStorage.getItem('name');
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
      this.iduser = user.id;
      console.log(this.iduser);
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }



}
