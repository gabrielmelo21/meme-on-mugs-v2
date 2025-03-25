import {Injectable, OnDestroy} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayAudioService implements OnDestroy {
  private currentAudio: HTMLAudioElement | null = null; // Mantém referência ao áudio atual

  constructor() {}

  // 🔊 Música de fundo principal
  playMusic(): void {
    this.playAudio('mao-zedong-music.mp3', true);
  }

  playDontStopMusic(): void {
    this.playAudio('dont-stop-music.mp3', true);
  }
  playWow(){
    this.playAudio('wow.mp3',false);
  }


  // 🔇 Pausa qualquer som em reprodução
  stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
  }

  // 🎼 Função genérica para tocar qualquer áudio
  private playAudio(filename: string, loop: boolean): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(`assets/audios/${filename}`);
    this.currentAudio.loop = loop; // Se for música de fundo, toca em loop
    this.currentAudio.play().catch(error => console.error('Erro ao reproduzir áudio:', error));
  }

  ngOnDestroy(): void {
    this.stopAudio();
  }
}
