import { Produto } from './../models/produto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = "https://app-pinguino.herokuapp.com/v1/Produtos";

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private error: ErrorHandlerService
  ) { }

  get(): Observable<Array<Produto>> {
    return this.http.get<Array<Produto>>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  getOne(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/one?id=${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  createOne(produto: Produto): Observable<boolean> {

    return this.http.post<boolean>(`${this.baseUrl}/one`, produto, this.options).pipe(
      map((obj) => obj),
      catchError((e) => this.error.handler(e))
    );
  }

  updateOne(produto: Produto): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, produto, this.options).pipe(
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
