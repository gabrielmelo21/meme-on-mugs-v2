import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  private numberSubject = new BehaviorSubject<number>(1000);  // Valor inicial 0
  number$ = this.numberSubject.asObservable();

  // Método para somar o valor atual
  updateNumber(valueToAdd: number): void {
    const currentValue = this.numberSubject.getValue();  // Obtém o valor atual
    this.numberSubject.next(currentValue + valueToAdd);  // Soma o valor atual com o novo valor
  }
}
