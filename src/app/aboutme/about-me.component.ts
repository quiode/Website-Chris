import {Component} from '@angular/core';
import {DateTime} from "luxon";

@Component({
  selector: 'app-aboutme',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  readonly birthDate = DateTime.local(2003, 10, 23);
}
