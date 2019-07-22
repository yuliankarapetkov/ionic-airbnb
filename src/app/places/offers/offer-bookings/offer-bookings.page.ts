import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  offer: Place;

  private _componentAlive$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.route
      .paramMap
      .subscribe(paramMap => {
        if (!paramMap.has('placeId')) {
          this.navController.navigateBack('/places/tabs/offers');
          return;
        }

        const placeId = paramMap.get('placeId');

        this.placesService
          .getPlace(placeId)
          .pipe(takeUntil(this._componentAlive$))
          .subscribe(place => this.offer = place);
      });
  }

  ngOnDestroy(): void {
    this._componentAlive$.next();
    this._componentAlive$.complete();
  }

}
