import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private router: Router) {} // Injetar o Router

  // Método que será acionado ao clicar no botão
  goToOtherPage() {
    this.playSound()
    this.router.navigate(['/fuck']); // Redireciona para a rota especificada
  }


  
  playSound(): void {
    const audio = new Audio('assets/swipe.mp3');
    audio.play();
  }
}
