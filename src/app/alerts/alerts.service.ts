import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private snackBar: MatSnackBar) { }

  showAlert(message: string, buttonText: string, alertType: 'default' | 'error' | 'success') {
    this.snackBar.open(message, buttonText, {
      duration: 20000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: alertType
    })
  }
}
