import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalController, ActionSheetController } from '@ionic/angular';

import { Capacitor, Geolocation, Plugins, Camera, CameraSource, CameraResultType } from '@capacitor/core';

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
  photo: string;

  constructor(
    private _modalController: ModalController,
    private _http: HttpClient,
    private _actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {}

  async pickLocation(): Promise<void> {
    const actionSheetElement = await this._actionSheetController.create({
      header: 'Choose an option',
      buttons: [
        {
          text: 'Take a photo',
          handler: async (): Promise<void> => {
            if (Capacitor.isPluginAvailable('Camera')) {
              const photo = await Plugins.Camera.getPhoto({
                quality: 50,
                source: CameraSource.Prompt,
                correctOrientation: true,
                width: 600,
                resultType: CameraResultType.DataUrl
              });

              this.photo = photo.dataUrl;
            }
          }
        },
        {
          text: 'Use my location',
          handler: () => {
            this._getUserLocation();
          }
        },
        {
          text: 'Choose on map',
          handler: () => {
            this._openMapModal();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheetElement.present();
  }

  private async _getUserLocation(): Promise<void> {
    if (Capacitor.isPluginAvailable('Geolocation')) {
      const { latitude: lat, longitude: lng } = (await Geolocation.getCurrentPosition()).coords;
      this._setLocation(lat, lng);
    }
  }

  private async _openMapModal(): Promise<void> {
    const modalElement = await this._modalController.create({
      component: MapModalComponent
    });

    modalElement.present();

    const dissmissEvent = await modalElement.onDidDismiss();

    if (dissmissEvent.data) {
      const { lat, lng } = dissmissEvent.data;
      this._setLocation(lat, lng);
    }
  }

  private _setLocation(lat: number, lng: number): void {
    this._getAddress(lat, lng)
        .subscribe((address: string) => {
          const imageUrl = this._getMapImage(lat, lng);
          this.location = { lat, lng, address, imageUrl };
        });
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
