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
  musicUrl = '';

  constructor(private musicService: MusicService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.music) {
      this.musicService.getCoverUrl(this.music.id).then((url) => {
        this.coverUrl = url;
      });
    }
    if (this.music) {
      this.musicService.getAudioUrl(this.music.id).then((url) => {
        this.musicUrl = url;
      });
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  openSpotify() {
    if (this.music?.url.startsWith('http')) {
      window.open(this.music?.url, '_blank');
    } else {
      window.open('http://' + this.music?.url, '_blank');
    }
  }

  detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
}
