import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import { SharedModule } from '../shared/shared.module';
import { MusicItemComponent } from './music-item/music-item.component';

@NgModule({
  declarations: [MusicComponent, MusicItemComponent],
  imports: [CommonModule, SharedModule],
})
export class MusicModule {}
