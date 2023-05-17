import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Const } from '../const';
import { Infraction } from '../models/infraction';

@Injectable({
  providedIn: 'root'
})
export class InfractionService {

  constUrl = Const.appURL;
  private baseUrl = this.constUrl + '/api/listinfraction';
  private baseUrl1 = this.constUrl + '/api/infractions/export/pdf';
  private baseUrl2 = this.constUrl + '/api/listCountEtats';
  private baseUrl3 = this.constUrl + '/api/filterInfraction';
  private baseUrl4 = this.constUrl + '/api/infractions/numEmp';

  choixmenu: string = 'A';
  listData: Infraction[] = [];
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

  getCountEtat(): Observable<any> {
    return this.http.get(`${this.baseUrl2}`);
  }

  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl1}`, { responseType: 'blob' });
  }

  getInfractionByDate(dateInfractionStart: Date, dateInfractionEnd: Date, numInfraction: number, source: string): Observable<any> {

    this.d1 = new Date(dateInfractionStart);
    this.d2 = new Date(dateInfractionEnd);

    let params = new HttpParams();
    params = params.set('dateStart', this.d1.toDateString());
    params = params.set('dateEnd', this.d2.toDateString());
    params = params.set('numInfraction', numInfraction);
    params = params.set('source', source);

    return this.http.get(`${this.baseUrl3}`, { params: params });
  }

  getInfractionByNumAndEmp(numInfraction: number, source: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('numInfraction', numInfraction);
    params = params.set('source', source);
    return this.http.get(`${this.baseUrl4}`, { params: params });
  }

}
