import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Const } from '../const';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  url = Const.appURL;
  private urlr = this.url + "/api/auth/roles"
  //private baseUrl1 = this.url + '/api/auth/roles/findbyName';
  constructor(private http: HttpClient,) { }
  getAllR(): Observable<any> {
    return this.http.get(`${this.urlr}`);
  }


}
