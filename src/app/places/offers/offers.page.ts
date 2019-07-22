import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IonItemSliding } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];

  private _componentAlive$ = new Subject<void>();

  constructor(
    private router: Router,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.placesService
      .places$
      .pipe(takeUntil(this._componentAlive$))
      .subscribe(places => this.offers = places);
  }

  ngOnDestroy(): void {
    this._componentAlive$.next();
    this._componentAlive$.complete();
  }

  edit(id: string, slidingItem: IonItemSliding): void {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
  }
}
