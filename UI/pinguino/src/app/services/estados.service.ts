import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Estado } from '../models/estado';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  baseUrl = "https://app-pinguino.herokuapp.com/v1/Estados";

  options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private error: ErrorHandlerService
  ) { }

  get(): Observable<Array<Estado>> {
    return this.http.get<Array<Estado>>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  getOne(id: string): Observable<Estado> {
    return this.http.get<Estado>(`${this.baseUrl}/one?id=${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  createOne(estado: Estado): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/one`, estado, this.options).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  updateOne(estado: Estado): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, estado, this.options).pipe(
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
