import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Endereco } from '../models/endereco';
import { Fornecedor } from '../models/fornecedor';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  baseUrl = "https://app-pinguino.herokuapp.com/v1/Fornecedores";

  options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private error: ErrorHandlerService
  ) { }

  get(): Observable<Array<Fornecedor>> {
    return this.http.get<Array<Fornecedor>>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  getOne(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.baseUrl}/one?id=${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  createOne(fornecedor: Fornecedor): Observable<boolean> {
     return this.http.post<boolean>(`${this.baseUrl}/one` , fornecedor, this.options).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  updateOne(fornecedor: Fornecedor): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, fornecedor, this.options).pipe(
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
