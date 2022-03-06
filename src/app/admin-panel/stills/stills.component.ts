import { FormGroup } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stills',
  templateUrl: './stills.component.html',
  styleUrls: ['./stills.component.scss'],
})
export class AdminStillsComponent implements OnInit {
  constructor() {}
  selectedFiles: FileList | null = null;

  ngOnInit(): void {}

  filesSelected(event: FileList) {
    this.selectedFiles = event;
  }

  submit() {}
}
