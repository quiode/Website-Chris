import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import videojs from 'video.js';
import { Music, MusicService } from './music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
  music: Music[] = [];
  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.musicService.music.subscribe((music) => {
      this.music = music;
    });
  }
}
