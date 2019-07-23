import { Component, OnInit, OnDestroy } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SegmentChangeEventDetail } from '@ionic/core';

import { AuthService } from './../../auth/auth.service';
import { PlacesService } from './../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  placeList: Place[];

  private _places: Place[];
  private _filteredPlaces: Place[];
  private _filter = 'all';

  private _componentAlive$ = new Subject<void>();

  get featuredPlace(): Place {
    return this._filteredPlaces && this._filteredPlaces.length && this._filteredPlaces[0];
  }

  constructor(
    private placesService: PlacesService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.placesService
      .places$
      .pipe(takeUntil(this._componentAlive$))
      .subscribe(places => {
        this._places = places;
        this._updatePlaces();
      });
  }

  ngOnDestroy(): void {
    this._componentAlive$.next();
    this._componentAlive$.complete();
  }

  onFilterChange(event: CustomEvent<SegmentChangeEventDetail>): void {
    this._filter = event.detail.value;
    this._updatePlaces();
  }

  private _updatePlaces(): void {
    this._filteredPlaces = this._filter === 'all' ?
      this._places : this._places.filter(p => p.userId !== this._authService.userId);
    this.placeList = this._filteredPlaces.slice(1);
  }
}
