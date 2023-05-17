import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Const } from '../const';
import { Employe } from '../models/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  uu = Const.appURL;
  private baseUrl = this.uu + '/api/employes';
  private baseUrl1 = this.uu + '/api/employes/5';

  private baseUrl2 = this.uu + '/api/employes/pdf';

  //private baseUrl = 'http://localhost:8082/backend/api/employes';
  choixmenu: string = 'A';
  listData: Employe[] = [];
  public dataForm!: FormGroup;

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getEmp(id: String): Observable<Object> {
    return this.http.get(`${this.baseUrl1}/${id}`);
  }
  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);
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
  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl2}`, { responseType: 'blob' });
  }
}
