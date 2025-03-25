import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {SharedStateService} from "../../services/shared-state.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  number: number = 0;  // Variável local que armazena o valor atual
   numberSubscription: Subscription | undefined;

  constructor(private sharedStateService: SharedStateService) {}

  ngOnInit(): void {
    // Subscreva-se ao BehaviorSubject para escutar as mudanças
    this.numberSubscription = this.sharedStateService.number$.subscribe(value => {
      this.number = value;  // Atualiza o valor da variável local sempre que mudar
    });
  }


  ngOnDestroy(): void {
  }





 /**
  goToOtherPage() {
    this.playSound()
    this.router.navigate(['/fuck']); // Redireciona para a rota especificada
  }



  playSound(): void {
    const audio = new Audio('assets/swipe.mp3');
    audio.play();
  }

    **/
}
