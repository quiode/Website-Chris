import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import { VideosItemComponent } from './videos-item/videos-item.component';



@NgModule({
  declarations: [
    VideosComponent,
    VideosItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VideosModule { }
