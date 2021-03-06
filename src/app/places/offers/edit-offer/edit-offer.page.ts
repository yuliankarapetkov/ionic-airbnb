import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavController, LoadingController } from '@ionic/angular';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  offer: Place;
  offerForm: FormGroup;

  private _componentAlive$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController
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
          .subscribe(place => {
            this.offer = place;

            this.offerForm = this.formBuilder.group({
              title: [this.offer.title, [Validators.required]],
              description: [this.offer.description, [Validators.required, Validators.maxLength(180)]]
            });
          });
      });
  }

  ngOnDestroy(): void {
    this._componentAlive$.next();
    this._componentAlive$.complete();
  }

  async updateOffer(): Promise<void> {
    const { id } = this.offer;
    const { title, description } = this.offerForm.value;

    const loadingElement = await this.loadingController.create({ message: 'Updating offer..' });
    loadingElement.present();

    this.placesService
      .updatePlace(id, title, description)
      .subscribe(() => {
        loadingElement.dismiss();
        this.offerForm.reset();
        this.router.navigate(['/places/tabs/offers']);
      });
  }
}
