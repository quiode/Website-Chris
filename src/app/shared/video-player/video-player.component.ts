import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import videojs from 'video.js';
import { FullscreenService } from '../../stills/photo-viewer/fullscreen.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Input() videoUrl = '';
  @ViewChild('player') player!: HTMLVideoElement;
  constructor(private fullScreenService: FullscreenService) {}

  ngOnInit(): void {
    videojs(this.player, {
      controls: true,
      autoplay: false,
      preload: 'auto',
    });
    this.fullScreenService.openFullscreen();
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    this.fullScreenService.closeFullscreen();
    document.body.style.overflow = 'auto';
  }
}
