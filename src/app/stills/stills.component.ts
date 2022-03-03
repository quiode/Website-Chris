import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewRef } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Still } from './still.interface';
import { StillsApiService } from './stills-api.service';

@Component({
  selector: 'app-stills',
  templateUrl: './stills.component.html',
  styleUrls: ['./stills.component.scss'],
})
export class StillsComponent implements OnInit {
  constructor(
    private stillsApi: StillsApiService,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild('stillsContainer', { static: true })
  stillsContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.stillsApi.getStillsMetadata().subscribe((stills) => {
      for (const still of stills) {
        this.stillsApi
          .getThumbnailImage(still.id)
          .catch((error) => {
            // TODO: handle error
            console.error(error);
          })
          .then((image) => {
            if (image) {
              this.renderer.listen(image, 'click', (e) => {
                this.onClick(still.id);
              });
              this.renderer.setStyle(image, 'order', `${this.stillsApi.getPosition(still.id)}`);
              this.renderer.appendChild(this.stillsContainer.nativeElement, image);
            }
          });
      }
    });
  }

  onClick(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
