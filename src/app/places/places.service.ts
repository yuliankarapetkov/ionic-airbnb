import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, delay, tap } from 'rxjs/operators';

import { Place } from './place.model';
import { AuthService } from './../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places$ = new BehaviorSubject<Place[]>([
    new Place(
      'p1', 
      'Manhattan Mansion', 
      'In the heart of NY City', 
      'http://homesoftherich.net/wp-content/uploads/2009/12/Picture-17.png', 
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p2', 
      'Plovdiv Mansion', 
      'In the heart of Plovdiv', 
      'http://homesoftherich.net/wp-content/uploads/2009/12/Picture-17.png', 
      19.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p3', 
      'Sofia Mansion', 
      'In the heart of Sofia', 
      'https://s-ec.bstatic.com/images/hotel/max1024x768/177/177415157.jpg', 
      29.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    )
  ]);

  constructor(
    private _authService: AuthService
  ) { }

  get places$(): Observable<Place[]> {
    return this._places$.asObservable();
  }

  getPlace(id: string): Observable<Place> {
    return this.places$
      .pipe(
        take(1),
        map(places => places.find(p => p.id === id))
      );
  }

  createPlace(title: string, description: string, price: number, fromDate: Date, toDate: Date): Observable<Place[]> {
    const place = new Place(
      (Math.random() * 100).toString(),
      title,
      description,
      'https://s-ec.bstatic.com/images/hotel/max1024x768/177/177415157.jpg',
      price,
      fromDate,
      toDate,
      this._authService.userId
    );

    return this.places$
      .pipe(
        take(1),
        delay(1000),
        tap(places => this._places$.next([ ...places, place ]))
      );
  }
}
