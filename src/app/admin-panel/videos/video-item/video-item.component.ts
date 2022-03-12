import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Video } from '../videos.component';
import { AdminVideosApiService } from '../admin-videos-api.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  @Output() videoChange = new EventEmitter<Video>();
  @Output() deleteVideo = new EventEmitter<string>();
  imgUrl1: string = '';
  imgUrl2: string = '';
  imgUrl3: string = '';

  constructor(private videosService: AdminVideosApiService, private router: Router) {}

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

  urlInputChange(event: Event) {
    this.video.url = (event.target as HTMLInputElement).value;
    this.videoChange.emit(this.video);
  }

  titleInputChange(event: Event) {
    this.video.line1 = (event.target as HTMLInputElement).value;
    this.videoChange.emit(this.video);
  }

  subtitleInputChange(event: Event) {
    this.video.line2 = (event.target as HTMLInputElement).value;
    this.videoChange.emit(this.video);
  }

  onDelete() {
    this.deleteVideo.emit(this.video.id);
  }

  openPlayer() {
    this.router.navigate(['admin', 'videos', this.video.id]);
  }
}
