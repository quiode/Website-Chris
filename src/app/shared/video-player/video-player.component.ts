import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  HostListener,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('video') video: ElementRef<HTMLVideoElement> | null = null;
  videoUrl = '';
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    this.videoUrl = environment.apiUrl + 'videos/' + this.activatedRoute.snapshot.params['id'];
    screen.orientation.lock('landscape-primary');
    if (this.video) {
      this.video.nativeElement.requestFullscreen();
      this.video.nativeElement.play();
    }
  }

  ngAfterViewInit(): void {
    if (this.video) {
      this.video.nativeElement.requestFullscreen();
      this.video.nativeElement.play();
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
    document.exitFullscreen();
    screen.orientation.unlock();
  }

  close(): void {
    this.router.navigate(['/videos']);
  }
}
