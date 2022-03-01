import { Component, OnInit } from '@angular/core';
import { Still } from './still.interface';
import { StillsApiService } from './stills-api.service';

@Component({
  selector: 'app-stills',
  templateUrl: './stills.component.html',
  styleUrls: ['./stills.component.scss'],
})
export class StillsComponent implements OnInit {
  constructor(private stillsApi: StillsApiService) {}

  fetchedStills: Still[] = [];

  ngOnInit(): void {
    this.stillsApi.getStills().subscribe((stills) => {
      this.fetchedStills = stills;
      console.log(stills);
    });
  }
}
