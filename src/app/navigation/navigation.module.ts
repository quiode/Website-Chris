import { NavigationComponent } from './navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
