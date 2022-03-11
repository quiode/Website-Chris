import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-linktree-link',
  templateUrl: './linktree-link.component.html',
  styleUrls: ['./linktree-link.component.scss'],
})
export class LinktreeLinkComponent implements OnInit {
  @Input() text: string = '';
  @Input() link: string = '';
  @Input() imgSrc: string = '';

  constructor() {}

  ngOnInit(): void {}
}
