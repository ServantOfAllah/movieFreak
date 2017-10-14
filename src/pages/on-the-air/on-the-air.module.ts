import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnTheAirPage } from './on-the-air';

@NgModule({
  declarations: [
    OnTheAirPage,
  ],
  imports: [
    IonicPageModule.forChild(OnTheAirPage),
  ],
})
export class OnTheAirPageModule {}
