import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavController, ModalController, ActionSheetController } from '@ionic/angular';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.route
      .paramMap
      .subscribe(paramMap => {
        if (!paramMap.has('placeId')) {
          this.navController.navigateBack('/places/tabs/discover');
          return;
        }

        const placeId = paramMap.get('placeId');
        this.place = this.placesService.getPlace(placeId);
      });
  }

  async bookPlace(): Promise<void> {
    const actionSheetElement = await this.actionSheetController
      .create({
        header: 'Choose an action',
        buttons: [{
            text: 'Select date',
            handler: () => this.openCreateBookingModal('select')
          }, {
            text: 'Random date',
            handler: () => this.openCreateBookingModal('random')
          }, {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });

    actionSheetElement.present();
  }

  openCreateBookingModal(mode: 'select' | 'random'): void {
    console.log(mode);

    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: {
          selectedPlace: this.place,
          mode
        }
      })
      .then(modalElement => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          console.log('BOOKED!', resultData.data);
        }
      });
  }
}
