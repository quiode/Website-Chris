import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  constructor() {}
  @Input()
  fileType = 'image/jpeg';
  @Output()
  filesEvent = new EventEmitter<FileList>();
  filesSelected = false;

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const files: FileList = (event.target as any).files;

    if (files && files.length > 0) {
      this.filesSelected = true;
      this.filesEvent.emit(files);
    } else {
      this.filesSelected = false;
    }
  }
}
