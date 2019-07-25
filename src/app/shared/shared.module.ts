import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { MapModalComponent } from './components/map-modal/map-modal.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        IonicModule
    ],
    declarations: [
        LocationPickerComponent,
        MapModalComponent
    ],
    exports: [
        LocationPickerComponent,
        MapModalComponent
    ],
    entryComponents: [
        MapModalComponent
    ]
})
export class SharedModule {

}