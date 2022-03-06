import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface StillItem {
  id: string;
  thumbnailUrl: string;
  imageUrl: string;
}

@Component({
  selector: 'app-still-item',
  templateUrl: './still-item.component.html',
  styleUrls: ['./still-item.component.scss'],
})
export class StillItemComponent implements OnInit {
  @Input() still: StillItem | null = null;
  @Output() deleteStill = new EventEmitter<StillItem>();
  @Output('openImage') openImage2 = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  delete() {
    if (this.still) {
      this.deleteStill.emit(this.still);
    }
  }

  openImage() {
    if (this.still) {
      this.openImage2.emit(this.still.imageUrl);
    }
  }
}
