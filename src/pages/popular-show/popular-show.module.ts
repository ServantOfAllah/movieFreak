import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularShowPage } from './popular-show';

@NgModule({
  declarations: [
    PopularShowPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularShowPage),
  ],
})
export class PopularShowPageModule {}
