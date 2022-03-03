import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewRef,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { StillsApiService } from '../stills-api.service';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss'],
})
export class PhotoViewerComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private stillsApiService: StillsApiService,
    private router: Router
  ) {}
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
  }

  close(): void {
    this.router.navigate(['/stills']);
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }
}
