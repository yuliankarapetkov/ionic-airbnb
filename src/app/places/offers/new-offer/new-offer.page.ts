import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  offerForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(180)]],
    price: ['', [Validators.required, Validators.min(1)]],
    availableFrom: ['', [Validators.required]],
    availableTo: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private _placesService: PlacesService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  createOffer(): void {
    const { title, description, price, availableFrom: fromDate, availableTo: toDate } = this.offerForm.value;

    this._placesService.createPlace(title, description, price, new Date(fromDate), new Date(toDate));

    this.offerForm.reset();
    this._router.navigate(['/places/tabs/offers']);
  }
}
