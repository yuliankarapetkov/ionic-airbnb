import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController } from '@ionic/angular';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  offer: Place;
  offerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService,
    private formBuilder: FormBuilder
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
        this.offer = this.placesService.getPlace(placeId);

        this.offerForm = this.formBuilder.group({
          title: [this.offer.title, [Validators.required]],
          description: [this.offer.description, [Validators.required, Validators.maxLength(180)]]
        });
      });
  }

  updateOffer(): void {
    console.log(this.offerForm.value)
  }
}
