import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Municipio } from '../models/municipio';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  //baseUrl = "https://app-pinguino.herokuapp.com/v1/Municipios";
  baseUrl = "https://localhost:44310/v1/Municipios";

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private error: ErrorHandlerService
  ) { }

  get(): Observable<Array<Municipio>> {
    return this.http.get<Array<Municipio>>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  getOne(id: number): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.baseUrl}/one?id=${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  createOne(municipio: Municipio): Observable<boolean> {
    municipio.ativo = true
    return this.http.post<boolean>(`${this.baseUrl}/one`, municipio, this.options).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  updateOne(municipio: Municipio): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, municipio, this.options).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}?id=${id}`, this.options).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }


}