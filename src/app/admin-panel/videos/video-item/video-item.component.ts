import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../videos.component';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {
  @Input() video: Video | null = null;

  constructor() {}

  ngOnInit(): void {}
}
