import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { take, delay, tap } from 'rxjs/operators';

import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
    private _bookings$ = new BehaviorSubject<Booking[]>([]);

    get bookings$(): Observable<Booking[]> {
        return this._bookings$.asObservable();
    }

    constructor(
        private _authService: AuthService
    ) {}

    createBooking(
        placeId: string,
        placeTitle: string,
        placeImageUrl: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        fromDate: Date,
        toDate: Date
    ): Observable<Booking[]> {
        const booking = new Booking(
            (Math.random() * 100).toString(),
            placeId,
            this._authService.userId,
            placeTitle,
            placeImageUrl,
            firstName,
            lastName,
            guestNumber,
            fromDate,
            toDate
        );

        return this._bookings$
            .pipe(
                take(1),
                delay(1000),
                tap(bookings => this._bookings$.next([ ...bookings, booking ]))
            );
    }

    removeBooking(bookingId: string): Observable<Booking[]> {
        return this._bookings$
            .pipe(
                take(1),
                delay(1000),
                tap(bookings => this._bookings$.next(bookings.filter(b => b.id !== bookingId)))
            );
    }
}