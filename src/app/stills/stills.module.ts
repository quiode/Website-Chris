import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StillsComponent } from './stills.component';
import { StillsApiService } from './stills-api.service';

@NgModule({
  imports: [CommonModule],
  declarations: [StillsComponent],
  providers: [StillsApiService],
})
export class StillsModule {}
