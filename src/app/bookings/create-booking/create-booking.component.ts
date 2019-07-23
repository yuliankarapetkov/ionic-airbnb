import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() mode: 'select' | 'random';

  @ViewChild('f') form: NgForm;

  startDate: Date;
  endDate: Date;

  private readonly _dayInMilliseconds = 24 * 60 * 60 * 1000;

  get datesValid(): boolean {
    const fromDate = new Date(this.form.value['from-date']);
    const toDate = new Date(this.form.value['to-date']);
    return toDate > fromDate;
  }

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    const { availableFrom, availableTo } = this.selectedPlace;

    if (this.mode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
        Math.random() *
        (availableTo.getTime() - (7 * this._dayInMilliseconds) - availableFrom.getTime())
      );

      this.endDate = new Date(
        this.startDate.getTime() +
        Math.random() *
        (this.startDate.getTime() + (6 * this._dayInMilliseconds) - new Date(this.startDate).getTime())
      );
    }
  }

  bookPlace(): void {
    if (this.form.valid && this.datesValid) {
      const booking = {
        firstName: this.form.value['first-name'],
        lastName: this.form.value['last-name'],
        guestNumber: +this.form.value['guest-number'],
        fromDate: new Date(this.form.value['from-date']),
        toDate: new Date(this.form.value['to-date'])
      };

      this.modalController.dismiss({ booking }, 'confirm');
    }
  }

  cancel(): void {
    this.modalController.dismiss(null, 'cancel');
  }
}
