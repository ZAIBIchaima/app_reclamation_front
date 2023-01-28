import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Infraction } from '../models/infraction';

@Injectable({
  providedIn: 'root'
})
export class InfractionService {

  private baseUrl = 'http://localhost:8082/backend/listinfraction';

  choixmenu: string = 'A';
  listData: Infraction[] = [];
  public dataForm!: FormGroup;

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createData(formData: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, formData);
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
