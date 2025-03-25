import { TestBed } from '@angular/core/testing';

import { PlayAudioService } from './play-audio.service';

describe('PlayAudioService', () => {
  let service: PlayAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
