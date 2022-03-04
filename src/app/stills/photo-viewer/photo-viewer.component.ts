import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewRef,
  ElementRef,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StillsApiService } from '../stills-api.service';
import { FullscreenService } from './fullscreen.service';
import { PhotoViewerService } from './photo-viewer.service';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss'],
})
export class PhotoViewerComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private stillsApiService: StillsApiService,
    private router: Router,
    private fullScreenService: FullscreenService,
    private photoViewerService: PhotoViewerService
  ) {}
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'ArrowLeft') {
      this.prev();
    }
  }

  imageURL = 'assets/Loader.gif';

  ngOnInit(): void {
    document.fullscreenElement?.requestFullscreen();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.stillsApiService.getImageUrl(params['id']).then((url) => {
          this.imageURL = url;
        });
      }
    });
    document.body.style.overflow = 'hidden';
    this.fullScreenService.openFullscreen();
  }

  close(): void {
    this.router.navigate(['/stills']);
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
    this.fullScreenService.closeFullscreen();
  }

  next(): void {
    const imageUrl = this.imageURL.valueOf();
    this.imageURL = 'assets/Loader.gif';
    this.photoViewerService.nextImageUrl(imageUrl).then((url) => {
      this.imageURL = url;
    });
  }

  prev(): void {
    const imageUrl = this.imageURL.valueOf();
    this.imageURL = 'assets/Loader.gif';
    this.photoViewerService.prevImageUrl(imageUrl).then((url) => {
      this.imageURL = url;
    });
  }
}
