import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Const } from '../const';

const AUTH_API = Const.appURL + '/api/auth/';
//const AUTH_API = 'http://localhost:8080/api/auth/';
//const AUTH_API = 'http://localhost:8082/backend/api/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {

    return this.http.get(AUTH_API + 'users');
  }

  login(credentials: { username: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }


}
