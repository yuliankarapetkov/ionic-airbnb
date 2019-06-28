import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IonItemSliding } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers: Place[];

  constructor(
    private router: Router,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.offers = this.placesService.places;
  }

  edit(id: string, slidingItem: IonItemSliding): void {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
  }
}
