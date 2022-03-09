import { Component, OnInit } from '@angular/core';
import { AdminVideosApiService } from './admin-videos-api.service';

export interface Video {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  image1: string;
  image2: string;
  image3: string;
}
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class AdminVideosComponent implements OnInit {
  constructor(private videosApi: AdminVideosApiService) {}
  videos: Video[] = [];

  ngOnInit(): void {
    this.videosApi.videos.subscribe((videos) => {
      this.videos = videos;
    });
  }

  onVideoSelected($event: any) {
    console.log($event);
  }

  onImagesSelected($event: any) {
    console.log($event);
  }
}
