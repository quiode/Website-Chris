import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  @Input() videoUrl = '';
  @ViewChild('player') player!: HTMLVideoElement;

  constructor() {}
}
