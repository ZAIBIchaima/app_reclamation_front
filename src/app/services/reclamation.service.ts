import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseUrl = 'http://localhost:8082/backend/api/listreclamation';
  private baseUrl1 = '/api/saveUserServer';
  // host: string = "http://localhost:8080/backend";
  choixmenu: string = 'A';
  listData: Reclamation[];
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


  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
