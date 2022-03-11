import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  declarations: [FileUploadComponent, VideoPlayerComponent],
  imports: [CommonModule],
  exports: [FileUploadComponent, VideoPlayerComponent],
})
export class SharedModule {}
