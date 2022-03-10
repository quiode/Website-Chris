import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Video } from '../videos.component';
import { AdminVideosApiService } from '../admin-videos-api.service';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {
  @Input() video: Video = {
    id: '',
    line1: '',
    line2: '',
    url: '',
    picture1Id: '',
    picture2Id: '',
    picture3Id: '',
    position: 0,
  };
  imgUrl1: string = '';
  imgUrl2: string = '';
  imgUrl3: string = '';

  constructor(private videosService: AdminVideosApiService) {}

  ngOnInit(): void {
    this.videosService.getImageUrl(this.video.picture1Id, this.video.id).then((url) => {
      this.imgUrl1 = url;
    });
    this.videosService.getImageUrl(this.video.picture2Id, this.video.id).then((url) => {
      this.imgUrl2 = url;
    });
    this.videosService.getImageUrl(this.video.picture3Id, this.video.id).then((url) => {
      this.imgUrl3 = url;
    });
  }
}
