import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Const } from '../const';
import { EtatReclamation } from '../models/etatReclamation';

@Injectable({
  providedIn: 'root'
})
export class EtatReclamationService {

  uu = Const.appURL;
  private baseUrl = this.uu + '/api/listEtatreclamation';
  //private baseUrl = 'http://localhost:8080/api/listEtatreclamation';
  //private baseUrl = 'http://localhost:8082/backend/api/listEtatreclamation';

  choixmenu: string = 'A';
  listData: EtatReclamation[];
  public dataForm!: FormGroup;

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);
  }
}
