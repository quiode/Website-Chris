import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StillsComponent } from './stills.component';
import { StillsApiService } from './stills-api.service';
import { PhotoViewerComponent } from './photo-viewer/photo-viewer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StillsComponent, PhotoViewerComponent],
  providers: [StillsApiService],
})
export class StillsModule {}
