import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent    {

  constructor() {
    setTimeout(() => {
      const footer = document.querySelector<HTMLElement>('.footer');

      if (footer) {
        footer.style.display = 'flex'; // Torna o footer visível
      }
    }, 2000); // 2000ms = 2 segundos

  }

}
