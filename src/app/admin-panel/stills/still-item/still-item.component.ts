import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminStillsApiService } from '../admin-stills-api.service';

/**
 * - index is the position
 */
export interface StillItem {
  id: string;
  thumbnail?: string;
}

@Component({
  selector: 'app-still-item',
  templateUrl: './still-item.component.html',
  styleUrls: ['./still-item.component.scss'],
})
export class StillItemComponent implements OnInit {
  @Input() still: StillItem | null = null;
  @Output() deleteStill = new EventEmitter<StillItem>();
  @Output('openImage') openImage2 = new EventEmitter<StillItem>();
  backend = environment.apiUrl + 'stills/';

  constructor(private apiService: AdminStillsApiService) {}
  thumbnailUrl = '';

  ngOnInit(): void {
    if (this.still) {
      this.apiService
        .getThumbnail(this.still.id)
        .then((url) => {
          this.thumbnailUrl = url;
          this.still!.thumbnail = url;
        })
        .catch((err) => {
          console.error(err);
          alert('Error loading still');
        });
    }
  }

  delete() {
    if (this.still) {
      this.deleteStill.emit(this.still);
    }
  }

  openImage() {
    if (this.still) {
      this.openImage2.emit(this.still);
    }
  }
}
