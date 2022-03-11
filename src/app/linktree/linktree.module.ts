import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinktreeComponent } from './linktree.component';
import { LinktreeLinkComponent } from './linktree-link/linktree-link.component';



@NgModule({
  declarations: [
    LinktreeComponent,
    LinktreeLinkComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LinktreeModule { }
