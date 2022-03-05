import { AdminVideosComponent } from './admin-panel/videos/videos.component';
import { AdminStillsComponent } from './admin-panel/stills/stills.component';
import { AdminMusicComponent } from './music/music.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpressumComponent } from './impressum/impressum.component';
import { LinktreeComponent } from './linktree/linktree.component';
import { StillsComponent } from './stills/stills.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { VideosComponent } from './videos/videos.component';
import { PhotoViewerComponent } from './stills/photo-viewer/photo-viewer.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './admin-panel/login/login.component';
import { MusicComponent } from './admin-panel/music/music.component';

const routes: Routes = [
  {
    path: 'impressum',
    component: ImpressumComponent,
  },
  {
    path: 'linktree',
    component: LinktreeComponent,
  },
  {
    path: 'music',
    component: MusicComponent,
  },
  {
    path: 'stills',
    component: StillsComponent,
    children: [{ path: ':id', component: PhotoViewerComponent }],
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'stills', component: AdminStillsComponent },
      { path: 'videos', component: AdminVideosComponent },
      { path: 'music', component: AdminMusicComponent },
      { path: '**', component: NotfoundComponent },
    ],
  },
  { path: 'videos', component: VideosComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: '', redirectTo: '/stills', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
