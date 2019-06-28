import { Injectable } from '@angular/core';

import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
    private _bookings: Booking[] = [
        {
            id: 'xyz',
            placeId: 'p2',
            placeTitle: 'Plovdiv Mansion',
            guestNumber: 2,
            userId: 'abc'
        }
    ];

    get bookings(): Booking[] {
        return [...this._bookings];
    }
}