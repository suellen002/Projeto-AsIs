import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { MessageBoxService } from './message-box.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private message: MessageBoxService
  ) { }  

  handler(e: any): Observable<any> {
    console.log(e);
    this.message.show('Ocorreu um erro durante o processamento.', true);
    return EMPTY;
  }
}
