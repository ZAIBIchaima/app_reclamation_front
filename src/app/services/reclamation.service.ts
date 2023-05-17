import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';

import { saveAs } from 'file-saver';
import { Const } from '../const';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  url = Const.appURL;
  private baseUrl = this.url + '/api/listreclamation';
  private baseUrl1 = this.url + '/api/export/pdf';
  private baseUrl2 = this.url + '/api/export/csv';
  private baseUrl3 = this.url + '/api/filterReclamation';
  private baseUrl4 = this.url + '/api/reclamation/ref';

  choixmenu: string = 'A';
  listData: Reclamation[];
  public dataForm: FormGroup;
  d1: Date;
  d2: Date;

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

  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl1}`, { responseType: 'blob' });
  }

  exportCSV(): Observable<Blob> {
    return this.http.get(`${this.baseUrl2}`, { responseType: 'blob' });
  }

  getBetweenTwoDate(dateStart: Date, dateEnd: Date, refReclamation: string): Observable<any> {

    this.d1 = new Date(dateStart);
    this.d2 = new Date(dateEnd);

    let params = new HttpParams();
    params = params.set('dateStart', this.d1.toDateString());
    params = params.set('dateEnd', this.d2.toDateString());
    params = params.set('refReclamation', refReclamation);
    //params = params.set('prenomNomSourceReclamation', prenomNomSourceReclamation);, prenomNomSourceReclamation: string

    return this.http.get(`${this.baseUrl3}`, { params: params });
  }

  getReclamationByNumAndNom(refReclamation: string, prenomNomSourceReclamation: string): Observable<any> {
    let params = new HttpParams();
    //params = params.set('numReclamation', numReclamation);
    params = params.set('refReclamation', refReclamation);
    params = params.set('prenomNomSourceReclamation', prenomNomSourceReclamation);

    return this.http.get(`${this.baseUrl4}`, { params: params });
  }


}
