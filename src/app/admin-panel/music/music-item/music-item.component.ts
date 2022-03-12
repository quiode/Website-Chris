import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Music, MusicService } from '../../../music/music.service';

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss'],
})
export class MusicItemComponent implements OnInit {
  @Input() music: Music | null = null;
  imageUrl = '';
  audioUrl = '';

  constructor(private musicService: MusicService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.music) {
      this.musicService.getImageUrl(this.music.id).then((url) => {
        this.imageUrl = url;
      });
      this.musicService.getAudioUrl(this.music.id).then((url) => {
        this.audioUrl = url;
      });
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
