import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import { VideosItemComponent } from './videos-item/videos-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [VideosComponent, VideosItemComponent],
  imports: [CommonModule, SharedModule],
  providers: [],
})
export class VideosModule {}
