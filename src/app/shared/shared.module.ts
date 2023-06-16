import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {VideoPlayerComponent} from './video-player/video-player.component';
import {DateDiffPipe} from "./pipes/date-diff.pipe";

@NgModule({
  declarations: [FileUploadComponent, VideoPlayerComponent, DateDiffPipe],
  imports: [CommonModule],
  exports: [FileUploadComponent, VideoPlayerComponent, DateDiffPipe],
})
export class SharedModule {}
