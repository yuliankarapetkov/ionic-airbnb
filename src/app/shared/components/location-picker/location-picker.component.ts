import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalController } from '@ionic/angular';

import { MapModalComponent } from './../map-modal/map-modal.component';
import { environment } from 'src/environments/environment';
import { CustomLocation } from '../../models/custom-location';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  location: CustomLocation;

  constructor(
    private _modalController: ModalController,
    private _http: HttpClient
  ) { }

  ngOnInit() {}

  async pickLocation(): Promise<void> {
    const modalElement = await this._modalController.create({
      component: MapModalComponent
    });

    modalElement.present();

    const dissmissEvent = await modalElement.onDidDismiss();

    if (dissmissEvent.data) {
      const { lat, lng } = dissmissEvent.data;

      this._getAddress(lat, lng)
        .subscribe((address: string) => {
          const imageUrl = this._getMapImage(lat, lng);
          this.location = { lat, lng, address, imageUrl };
        });
    }
  }

  private _getAddress(lat: number, lng: number): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMaps.key}`;

    return this._http
      .get(url)
      .pipe(
        map((data: any) => data && data.results && data.results.length && data.results[0].formatted_address)
      );
  }

  private _getMapImage(lat: number, lng: number): any {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}
      &zoom=13&size=500x300&maptype=roadmap
      &markers=color:red%7Clabel:Place%7C${lat},${lng}
      &key=${environment.googleMaps.key}`;
  }
}
