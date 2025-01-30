import {Component} from '@angular/core';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.css']
})
export class BottomNavigationComponent  {

  playSound(): void {
    const audio = new Audio('assets/swipe.mp3');
    audio.play();
  }


}
