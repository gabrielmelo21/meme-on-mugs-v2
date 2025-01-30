import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  show(message: string, duration: number = 1000): void {
    this.snackBar.open(message, 'X', {
      duration: duration,
    });
  }
}
