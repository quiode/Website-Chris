import { Component, OnInit } from '@angular/core';
import { Video } from '../admin-panel/videos/videos.component';
import { AdminVideosApiService } from '../admin-panel/videos/admin-videos-api.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  videos: Video[] = [];

  constructor(private videosService: AdminVideosApiService) {}

  ngOnInit(): void {
    this.videosService.updateVideos();
    this.videosService.videos.subscribe((videos) => {
      this.videos = videos;
    });
  }
}
