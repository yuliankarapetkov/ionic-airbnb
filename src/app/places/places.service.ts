import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1', 'Manhattan Mansion', 'In the heart of NY City', 'http://homesoftherich.net/wp-content/uploads/2009/12/Picture-17.png', 149.99),
    new Place('p2', 'Plovdiv Mansion', 'In the heart of Plovdiv', 'http://homesoftherich.net/wp-content/uploads/2009/12/Picture-17.png', 19.99),
    new Place('p3', 'Sofia Mansion', 'In the heart of Sofia', 'https://s-ec.bstatic.com/images/hotel/max1024x768/177/177415157.jpg', 29.99)
  ];

  constructor() { }

  get places(): Place[] {
    return [...this._places];
  }

  getPlace(id: string): Place {
    return {...this._places.find(p => p.id === id)};
  }
}
