import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { StillsModule } from './stills/stills.module';
import { MusicModule } from './music/music.module';
import { VideosModule } from './videos/videos.module';
import { ImpressumModule } from './impressum/impressum.module';
import { NotfoundModule } from './notfound/notfound.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { AboutmeModule } from './aboutme/aboutme.module';
import { LinktreeModule } from './linktree/linktree.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    HttpClientModule,
    StillsModule,
    MusicModule,
    VideosModule,
    ImpressumModule,
    NotfoundModule,
    AdminPanelModule,
    AboutmeModule,
    LinktreeModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
