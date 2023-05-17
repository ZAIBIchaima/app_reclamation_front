import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Const } from '../const';
import { Entite } from '../models/entite';

@Injectable({
  providedIn: 'root'
})
export class EntiteService {

  URL = Const.appURL;
  private baseUrl = this.URL + '/api/entites';
  private baseUrl1 = this.URL + '/api/entites/5';
  private baseUrl2 = this.URL + '/api/entites/pdf';

  choixmenu: string = 'A';
  listData: Entite[];
  public dataForm!: FormGroup;

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
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
  //getEntiteByNom
  getEntiteByNom(nom: String): Observable<Object> {
    return this.http.get(`${this.baseUrl1}/${nom}`);
  }

  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl2}`, { responseType: 'blob' });
  }
}
