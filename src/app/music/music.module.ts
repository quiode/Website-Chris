import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MusicComponent],
  imports: [CommonModule, SharedModule],
})
export class MusicModule {}
