import { Component, OnInit, Input } from '@angular/core';
import { Music, MusicService } from '../music.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss'],
})
export class MusicItemComponent implements OnInit {
  @Input() music: Music | null = null;
  coverUrl = '';

  constructor(private musicService: MusicService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.music) {
      this.musicService.getCoverUrl(this.music.id).then((url) => {
        this.coverUrl = url;
      });
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
