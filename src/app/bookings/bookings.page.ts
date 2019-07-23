import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

import { IonItemSliding } from '@ionic/angular';

import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings: Booking[];

  private _componentAlive$ = new Subject<void>();

  constructor(
    private _bookingService: BookingService
  ) { }

  ngOnInit() {
    this._bookingService
      .bookings$
      .pipe(takeUntil(this._componentAlive$))
      .subscribe(bookings => this.bookings = bookings);
  }

  ngOnDestroy(): void {
    this._componentAlive$.next();
    this._componentAlive$.complete();
  }

  cancelBooking(id: string, slidingItem: IonItemSliding): void {
    slidingItem.close();
  }
}
