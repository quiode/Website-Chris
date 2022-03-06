import { Component, OnInit } from '@angular/core';
import { StillItem } from './still-item/still-item.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-stills',
  templateUrl: './stills.component.html',
  styleUrls: ['./stills.component.scss'],
})
export class AdminStillsComponent implements OnInit {
  constructor() {}
  selectedFiles: FileList | null = null;
  stills: StillItem[] = [
    {
      id: '1',
      thumbnailUrl: 'https://pixy.org/src/477/4774988.jpg',
      imageUrl: 'https://pixy.org/src/477/4774988.jpg',
    },
    {
      id: '2',
      thumbnailUrl:
        'https://www.freepsdbazaar.com/wp-content/uploads/2020/06/sky-replace/sun-rise/sunrise-14-freepsdbazaar.jpg',
      imageUrl:
        'https://www.freepsdbazaar.com/wp-content/uploads/2020/06/sky-replace/sun-rise/sunrise-14-freepsdbazaar.jpg',
    },
    {
      id: '3',
      thumbnailUrl: 'https://pixy.org/src/487/4870083.jpg',
      imageUrl: 'https://pixy.org/src/487/4870083.jpg',
    },
  ];

  ngOnInit(): void {}

  filesSelected(event: FileList) {
    this.selectedFiles = event;
  }

  submit() {}

  drop($event: CdkDragDrop<StillItem[]>) {
    moveItemInArray(this.stills, $event.previousIndex, $event.currentIndex);
  }
}
