import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminStillsComponent } from './stills/stills.component';
import { AdminVideosComponent } from './videos/videos.component';
import { MusicComponent } from './music/music.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { SharedModule } from '../shared/shared.module';
import { StillItemComponent } from './stills/still-item/still-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    DragDropModule,
  ],
  declarations: [
    AdminPanelComponent,
    AdminStillsComponent,
    AdminVideosComponent,
    MusicComponent,
    LoginComponent,
    StillItemComponent,
  ],
  providers: [AuthService, AuthGuard, LoginGuard],
})
export class AdminPanelModule {}
