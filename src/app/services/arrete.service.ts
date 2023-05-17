import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Const } from '../const';
import { Arrete } from '../models/arrete';

@Injectable({
  providedIn: 'root'
})
export class ArreteService {

  API = Const.appURL;
  private baseUrl = this.API + '/api/listarrete';
  private baseUrl1 = this.API + '/api/arretes/export/pdf';
  private baseUrl2 = this.API + '/api/court/export/pdf';
  private baseUrl3 = this.API + '/api/filterArrete';
  private baseUrl4 = this.API + '/api/arrete/numArrete';

  choixmenu: string = 'A';
  listData: Arrete[] = [];
  public dataForm!: FormGroup;
  d1: Date;
  d2: Date;

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
  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl1}`, { responseType: 'blob' });
  }


  courtPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl2}/${id}`, { responseType: 'blob' });
  }
  getBetweenTwoDate(dateArreteStart: Date, dateArreteEnd: Date, refArrete: string): Observable<any> {

    this.d1 = new Date(dateArreteStart);
    this.d2 = new Date(dateArreteEnd);

    let params = new HttpParams();
    params = params.set('dateStart', this.d1.toDateString());
    params = params.set('dateEnd', this.d2.toDateString());
    //params = params.set('numArrete', numArrete);
    params = params.set('refArrete', refArrete);

    return this.http.get(`${this.baseUrl3}`, { params: params });
  }

  getArreteByNumAndNom(numArrete: number, refArrete: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('numArrete', numArrete);
    params = params.set('refArrete', refArrete);
    return this.http.get(`${this.baseUrl4}`, { params: params });
  }
}
