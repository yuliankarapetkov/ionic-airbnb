import { Component, OnInit, OnDestroy } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SegmentChangeEventDetail } from '@ionic/core';

import { PlacesService } from './../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  places: Place[];
  placeList: Place[];

  private _componentAlive$ = new Subject<void>();

  constructor(
    private placesService: PlacesService
  ) { }

  ngOnInit() {


    this.placesService
      .places$
      .pipe(takeUntil(this._componentAlive$))
      .subscribe(places => {
        this.places = places;
        this.placeList = this.places.slice(1);
      });
  }

  ngOnDestroy(): void {
    this._componentAlive$.next();
    this._componentAlive$.complete();
  }

  onFilterChange(event: CustomEvent<SegmentChangeEventDetail>): void {
    console.log(event.detail);
  }
}
