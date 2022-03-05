import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminStillsComponent } from './stills/stills.component';
import { AdminVideosComponent } from './videos/videos.component';
import { MusicComponent } from './music/music.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminStillsComponent,
    AdminVideosComponent,
    MusicComponent,
    LoginComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class AdminPanelModule {}
