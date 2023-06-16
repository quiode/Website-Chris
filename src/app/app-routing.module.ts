import {AdminVideosComponent} from './admin-panel/videos/videos.component';
import {AdminStillsComponent} from './admin-panel/stills/stills.component';
import {MusicComponent} from './music/music.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImpressumComponent} from './impressum/impressum.component';
import {LinktreeComponent} from './linktree/linktree.component';
import {StillsComponent} from './stills/stills.component';
import {AboutMeComponent} from './aboutme/about-me.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {VideosComponent} from './videos/videos.component';
import {PhotoViewerComponent} from './stills/photo-viewer/photo-viewer.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {LoginComponent} from './admin-panel/login/login.component';
import {AdminMusicComponent} from './admin-panel/music/music.component';
import {AuthGuard} from './admin-panel/auth.guard';
import {LoginGuard} from './admin-panel/login.guard';
import {VideoPlayerComponent} from './shared/video-player/video-player.component';

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
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'stills', component: AdminStillsComponent, canActivate: [AuthGuard] },
      {
        path: 'videos',
        component: AdminVideosComponent,
        canActivate: [AuthGuard],
        children: [{ path: ':id', component: VideoPlayerComponent }],
      },
      { path: 'music', component: AdminMusicComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'login' },
    ],
  },
  {
    path: 'videos',
    component: VideosComponent,
    children: [{ path: ':id', component: VideoPlayerComponent }],
  },
  { path: 'aboutme', component: AboutMeComponent },
  { path: '', redirectTo: '/stills', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
