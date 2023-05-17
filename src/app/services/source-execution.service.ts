import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Const } from '../const';
import { SourceExecution } from '../models/sourceExecution';

@Injectable({
  providedIn: 'root'
})
export class SourceExecutionService {

  uu = Const.appURL;
  private baseUrl = this.uu + '/api/listSourceExecution';
  private baseUrl1 = this.uu + '/api/sourceExecution/5';
  private baseUrl2 = this.uu + '/api/sourceExecution/pdf';

  choixmenu: string = 'A';
  listData: SourceExecution[];
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
  //getSourceByNom
  getSource(nom: String): Observable<Object> {
    return this.http.get(`${this.baseUrl1}/${nom}`);
  }
  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl2}`, { responseType: 'blob' });
  }
}
