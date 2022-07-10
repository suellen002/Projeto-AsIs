import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Endereco } from '../models/endereco';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  //baseUrl = "https://app-pinguino.herokuapp.com/v1/Enderecos";
  baseUrl = "https://localhost:44310/v1/Enderecos";

  options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private error: ErrorHandlerService
  ) { }

  get(): Observable<Array<Endereco>> {
    return this.http.get<Array<Endereco>>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  getOne(id: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseUrl}/one?id=${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  createOne(endereco: Endereco): Observable<boolean> {
     return this.http.post<boolean>(`${this.baseUrl}/one` , endereco, this.options).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  updateOne(endereco: Endereco): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, endereco, this.options).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

}
