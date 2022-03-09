import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../../admin-panel/videos/videos.component';

@Component({
  selector: 'app-videos-item',
  templateUrl: './videos-item.component.html',
  styleUrls: ['./videos-item.component.scss'],
})
export class VideosItemComponent implements OnInit {
  @Input() video: Video | null = null;

  hovering = false;
  imageURLs: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  openPlayer() {}
}
