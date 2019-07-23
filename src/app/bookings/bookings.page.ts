import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

import { IonItemSliding, LoadingController } from '@ionic/angular';

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
    private _bookingService: BookingService,
    private _loadingController: LoadingController
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

  async cancelBooking(bookingId: string, slidingItem: IonItemSliding): Promise<void> {
    slidingItem.close();

    const loadingElement = await this._loadingController.create({ message: 'Cancelling booking..' });
    loadingElement.present();

    this._bookingService
      .removeBooking(bookingId)
      .subscribe(() => loadingElement.dismiss());
  }
}
