import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  show(message: string, is_error: boolean = false): void {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: is_error ? ['msg-error'] : ['msg-success']
    })
  }
}
