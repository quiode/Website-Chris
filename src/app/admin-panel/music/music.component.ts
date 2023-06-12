import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { fileTypeValidator } from '../../shared/validators/file-type-validator.directive';
import { MusicService, Music } from '../../music/music.service';
import { Subscription } from 'rxjs';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class AdminMusicComponent implements OnInit, OnDestroy {
  constructor(private musicService: MusicService) {}
  files: { [index: string]: File } = {};
  uploadProgress: number | null = null;
  music: Music[] = [];
  subscription: Subscription | null = null;
  changes = false;
  uploadForm = new UntypedFormGroup({
    audio: new UntypedFormControl('', [Validators.required, fileTypeValidator(['mp3'])]),
    cover: new UntypedFormControl('', [Validators.required, fileTypeValidator(['jpg', 'jpeg'])]),
    url: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      ),
    ]),
  });

  ngOnInit(): void {
    this.subscription = this.musicService.music.subscribe((music) => {
      this.music = music;
      this.changes = false;
    });
  }

  applyClass(controlName: string): string {
    const control = this.uploadForm.get(controlName);
    if (control) {
      if (control.touched) {
        return control.invalid ? 'is-invalid' : 'is-valid';
      }
    }

    return '';
  }

  onFileSelect(event: any, formName: string) {
    if (event.target.files.length > 0) {
      this.files[formName] = event.target.files[0];
    }
  }

  submit(): void {
    if (this.uploadForm.valid) {
      if (this.files['audio'] && this.files['cover'] && this.uploadForm.get('url')) {
        this.musicService
          .saveMusic(this.files['audio'], this.files['cover'], this.uploadForm.get('url')!.value)
          .subscribe({
            next: (progress) => {
              this.uploadProgress = progress;
            },
            complete: () => {
              this.uploadProgress = null;
              this.files = {};
              this.uploadForm.reset({
                audio: '',
                cover: '',
                url: '',
              });
            },
            error: (err) => {
              this.uploadProgress = null;
              this.files = {};
              this.uploadForm.reset({
                audio: '',
                cover: '',
                url: '',
              });
            },
          });
      }
    }
  }

  onDelete(id: string): void {
    this.musicService.deleteMusic(id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onDrop(event: CdkDragDrop<Music[]>) {
    this.musicService.moveItem(event.previousIndex, event.currentIndex);
    this.changes = true;
  }

  urlChange(id: string, url: string): void {
    this.musicService.updateUrl(id, url);
    this.changes = true;
  }

  submitChanges(): void {
    this.musicService
      .submitChanges()
      .then(() => {
        this.changes = false;
        this.musicService.updateMusic();
      })
      .catch((err) => {
        this.changes = false;
        this.musicService.updateMusic();
      });
  }
}
