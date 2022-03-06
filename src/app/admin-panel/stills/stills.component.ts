import { Component, OnInit } from '@angular/core';
import { StillItem } from './still-item/still-item.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../environments/environment';
import { AdminStillsApiService } from './admin-stills-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stills',
  templateUrl: './stills.component.html',
  styleUrls: ['./stills.component.scss'],
})
export class AdminStillsComponent implements OnInit {
  constructor(private stillsService: AdminStillsApiService, private router: Router) {}
  selectedFiles: FileList | null = null;
  stillsChanged = false;
  stills: StillItem[] = [];
  backend = environment.apiUrl + 'stills/';
  uploadProgress: {
    finished: boolean;
    progress: number;
  }[] = [];
  progress = 0;
  finished = true;

  ngOnInit(): void {
    this.stillsService
      .getStills()
      .then((stills) => {
        this.stills = stills;
        this.stillsChanged = false;
      })
      .catch((err) => {
        alert('Error loading stills');
        console.error(err);
      });
  }

  filesSelected(event: FileList) {
    this.selectedFiles = event;
  }

  submit() {
    if (this.selectedFiles) {
      this.uploadProgress = this.stillsService.uploadStills(this.selectedFiles);
      const interval = setInterval(() => {
        this.progress = this.getProgress();
        this.finished = this.isFinished();
        if (this.isFinished()) {
          clearInterval(interval);
          this.uploadProgress = [];
          this.stillsService.getStills().then((stills) => {
            this.stills = stills;
            this.stillsChanged = false;
          });
        }
      }, 10);
    } else if (this.stillsChanged) {
      this.stillsChanged = false;
      this.stillsService
        .replaceAllPositions(this.stills)
        .then((stills) => {
          this.stills = stills;
          this.stillsChanged = false;
        })
        .catch((err) => {
          alert('Error saving stills');
          console.error(err);
        });
    }
  }

  drop($event: CdkDragDrop<StillItem[]>) {
    moveItemInArray(this.stills, $event.previousIndex, $event.currentIndex);
    this.stillsChanged = true;
  }

  onDelete(still: StillItem) {
    this.stillsService.deleteStill(still.id).then(() => {
      this.stillsService
        .getStills()
        .then((stills) => {
          this.stills = stills;
          this.stillsChanged = false;
        })
        .catch((err) => {
          alert('Error deleting still');
          console.error(err);
        });
    });
  }

  isFinished(): boolean {
    return this.uploadProgress.every((progress) => progress.finished);
  }

  getProgress(): number {
    return this.stillsService.getAverageUploadProgress(this.uploadProgress);
  }
}
