import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Video } from '../../admin-panel/videos/videos.component';
import { AdminVideosApiService } from '../../admin-panel/videos/admin-videos-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos-item',
  templateUrl: './videos-item.component.html',
  styleUrls: ['./videos-item.component.scss'],
})
export class VideosItemComponent implements OnInit {
  @Input() video: Video | null = null;
  @Output() playVideo = new EventEmitter<string>();
  @ViewChild('images') images!: ElementRef;
  @ViewChild('links') links!: ElementRef;

  imageURLs: string[] = ['', '', ''];

  constructor(private videosApi: AdminVideosApiService, private router: Router) {}

  ngOnInit(): void {
    if (this.video) {
      this.videosApi.getImageUrl(this.video.picture1Id, this.video.id).then((url) => {
        this.imageURLs[0] = url;
      });
      this.videosApi.getImageUrl(this.video.picture2Id, this.video.id).then((url) => {
        this.imageURLs[1] = url;
      });
      this.videosApi.getImageUrl(this.video.picture3Id, this.video.id).then((url) => {
        this.imageURLs[2] = url;
      });
    }
  }

  openPlayer() {
    if (this.video) {
      this.router.navigate(['/videos', this.video.id]);
    }
  }

  mouseEnter() {
    (this.images.nativeElement as HTMLDivElement).classList.add('hover');
    (this.links.nativeElement as HTMLDivElement).classList.add('hover');
  }

  mouseLeave() {
    (this.images.nativeElement as HTMLDivElement).classList.remove('hover');
    (this.links.nativeElement as HTMLDivElement).classList.remove('hover');
  }

  openLink(link: string) {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      window.open(`https://${link}`, '_blank');
    }
  }
}
