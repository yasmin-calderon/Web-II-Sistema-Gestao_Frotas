import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ocorrencia } from '../models/ocorrencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {
  private apiUrl = 'http://localhost:8080/ocorrencias';

  constructor(private http: HttpClient) {}

  registrarOcorrencia(ocorrencia: Ocorrencia): Observable<any> {
    return this.http.post(this.apiUrl, ocorrencia);
  }

  listarOcorrencias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
