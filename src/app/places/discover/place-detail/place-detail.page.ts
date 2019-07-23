import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { BookingService } from './../../../bookings/booking.service';
import { AuthService } from './../../../auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;

  private _componentAlive$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private _bookingService: BookingService,
    private _loadingController: LoadingController,
    private _authService: AuthService
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

        this.placesService
          .getPlace(placeId)
          .pipe(takeUntil(this._componentAlive$))
          .subscribe(place => {
            this.place = place;
            this.isBookable = this.place.userId !== this._authService.userId;
          });
      });
  }

  ngOnDestroy(): void {
    this._componentAlive$.next();
    this._componentAlive$.complete();
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

  async openCreateBookingModal(mode: 'select' | 'random'): Promise<void> {
    console.log(mode);

    const modalElement = await this.modalController
    .create({
      component: CreateBookingComponent,
      componentProps: {
        selectedPlace: this.place,
        mode
      }
    });

    modalElement.present();
    const event = await modalElement.onDidDismiss();

    if (event.role === 'confirm') {
      const { firstName, lastName, guestNumber, fromDate, toDate } = event.data.booking;

      const loadingElement = await this._loadingController.create({ message: 'Booking place..' });
      loadingElement.present();

      this._bookingService
        .createBooking(
          this.place.id,
          this.place.title,
          this.place.imageUrl,
          firstName,
          lastName,
          guestNumber,
          fromDate,
          toDate
        )
        .subscribe(() => loadingElement.dismiss());
    }
  }
}
