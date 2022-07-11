import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pais } from '../models/pais';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  baseUrl = "https://app-pinguino.herokuapp.com/v1/Paises";

  options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private error: ErrorHandlerService
  ) { }

  get(): Observable<Array<Pais>> {
    return this.http.get<Array<Pais>>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  getOne(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.baseUrl}/one?id=${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  createOne(pais: Pais): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/one`, pais, this.options).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  updateOne(pais: Pais): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, pais, this.options).pipe(
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