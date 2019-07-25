import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ModalController } from '@ionic/angular';

import { MapModalComponent } from './../map-modal/map-modal.component';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

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

      this._getAddress(lat, lng).subscribe((address) => console.log(address));
    }
  }

  private _getAddress(lat: number, lng: number): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMaps.key}`;

    return this._http
      .get(url)
      .pipe(map((data: any) => data && data.results && data.results.length && data.results[0].formatted_address));
  }
}
