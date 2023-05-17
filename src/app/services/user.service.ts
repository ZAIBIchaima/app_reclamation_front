import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Const } from '../const';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uu = Const.appURL;
  choixmenu: string = "A";
  public formData: FormGroup;
  list: any = {}
  listData: User[];
  url = Const.appURL;
  private urla = this.url + "/api/auth/signup"
  private baseUrl = this.url + '/api/auth/users';
  constructor(private http: HttpClient,) { }
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.urla}`, info);
  }
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  deleteAll(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
