import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  bookPlace(): void {
    this.modalController.dismiss({ message: 'ye' }, 'confirm');
  }

  cancel(): void {
    this.modalController.dismiss(null, 'cancel');
  }
}
