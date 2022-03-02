import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewRef } from '@angular/core';
import { Still } from './still.interface';
import { StillsApiService } from './stills-api.service';

@Component({
  selector: 'app-stills',
  templateUrl: './stills.component.html',
  styleUrls: ['./stills.component.scss'],
})
export class StillsComponent implements OnInit {
  constructor(private stillsApi: StillsApiService, private renderer: Renderer2) {}

  @ViewChild('stillsContainer', { static: true })
  stillsContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.stillsApi.getStillsMetadata().subscribe((stills) => {
      for (const still of stills) {
        this.stillsApi
          .getImage(still.id)
          .catch((error) => {
            // TODO: handle error
          })
          .then((image) => {
            if (image) {
              this.renderer.listen(image, 'click', () => {
                alert('Image clicked');
              });
              this.renderer.setProperty(image, '(click)', `showStill('${still.id}')`);
              this.renderer.appendChild(this.stillsContainer.nativeElement, image);
            }
          });
      }
    });
  }
}
