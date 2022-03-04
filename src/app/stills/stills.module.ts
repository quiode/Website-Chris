import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StillsComponent } from './stills.component';
import { StillsApiService } from './stills-api.service';
import { PhotoViewerComponent } from './photo-viewer/photo-viewer.component';
import { RouterModule } from '@angular/router';
import { PhotoViewerService } from './photo-viewer/photo-viewer.service';
import { FullscreenService } from './photo-viewer/fullscreen.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [StillsComponent, PhotoViewerComponent],
  providers: [StillsApiService, PhotoViewerService, FullscreenService],
})
export class StillsModule {}
