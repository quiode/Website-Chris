import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminStillsComponent } from './stills/stills.component';
import { AdminVideosComponent } from './videos/videos.component';
import { MusicComponent } from './music/music.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { SharedModule } from '../shared/shared.module';
import { StillItemComponent } from './stills/still-item/still-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminStillsApiService } from './stills/admin-stills-api.service';
import { HttpClientModule } from '@angular/common/http';
import { VideoItemComponent } from './videos/video-item/video-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    AdminPanelComponent,
    AdminStillsComponent,
    AdminVideosComponent,
    MusicComponent,
    LoginComponent,
    StillItemComponent,
    VideoItemComponent,
  ],
  providers: [AuthService, AuthGuard, LoginGuard, AdminStillsApiService],
})
export class AdminPanelModule {}
