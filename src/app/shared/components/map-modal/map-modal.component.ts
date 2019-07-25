import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') mapElementRef: ElementRef;

  private _googleMaps: any;
  private _clickListener: any;

  constructor(
    private _modalController: ModalController,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {}

  async ngAfterViewInit(): Promise<void> {
    try {
      this._googleMaps = await this._getGoogleMaps();
      const mapElement = this.mapElementRef.nativeElement;
      const map = new this._googleMaps.Map(mapElement, {
        center: { lat: -35, lng: 150 },
        zoom: 16
      });

      this._googleMaps.event.addListenerOnce(map, 'idle', () => {
        this._renderer.addClass(mapElement, 'visible');
      });

      this._clickListener = map.addListener('click', (event) => {
        const coordinates = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        this._modalController.dismiss(coordinates);
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this._googleMaps.event.removeListener(this._clickListener);
  }

  cancel(): void {
    this._modalController.dismiss();
  }

  private _getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;

    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMaps.key}`;
      script.async = true;
      script.defer = true;

      document.body.appendChild(script);

      script.onload = () => {
        const loadedGoogleModule = win.google;

        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      }
    });
  }
}
