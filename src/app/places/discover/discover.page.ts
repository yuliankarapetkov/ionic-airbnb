import { Component, OnInit } from '@angular/core';

import { SegmentChangeEventDetail } from '@ionic/core';

import { PlacesService } from './../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places: Place[];
  placeList: Place[];

  constructor(
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.places = this.placesService.places;
    this.placeList = this.places.slice(1);
  }

  onFilterChange(event: CustomEvent<SegmentChangeEventDetail>): void {
    console.log(event.detail);
  }
}
