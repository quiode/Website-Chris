import {
  Component,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import videojs from 'video.js';
import { VideoJsPlayer } from 'video.js';
import { FullscreenService } from '../../stills/photo-viewer/fullscreen.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() videoUrl = '';
  @Output() close = new EventEmitter<void>();
  @ViewChild('player') playerElement!: HTMLVideoElement;

  player: VideoJsPlayer | null = null;

  constructor(private fullScreenService: FullscreenService) {}

  ngOnInit(): void {
    // this.player = videojs(this.playerElement, {
    //   controls: true,
    //   autoplay: false,
    //   preload: 'auto',
    // });
    this.fullScreenService.openFullscreen();
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    this.fullScreenService.closeFullscreen();
    document.body.style.overflow = 'auto';
  }

  ngOnChanges(changes: SimpleChanges): void {
    //   if ('videoUrl' in changes) {
    //     console.log(this.videoUrl);
    //     this.player?.src(this.videoUrl);
    //   }
  }
}
