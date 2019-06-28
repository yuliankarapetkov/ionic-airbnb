import { Component, OnInit } from '@angular/core';

import { IonItemSliding } from '@ionic/angular';

import { BookingService } from './booking.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];

  constructor(
    private _bookingService: BookingService
  ) { }

  ngOnInit() {
    this.bookings = this._bookingService.bookings;
  }

  cancelBooking(id: string, slidingItem: IonItemSliding): void {
    slidingItem.close();
  }
}
