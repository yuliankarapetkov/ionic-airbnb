import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  createOffer(): void {
    console.log('creating offer..', this.offerForm.value)
  }

}
