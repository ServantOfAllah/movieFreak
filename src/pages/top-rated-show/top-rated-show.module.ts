import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopRatedShowPage } from './top-rated-show';

@NgModule({
  declarations: [
    TopRatedShowPage,
  ],
  imports: [
    IonicPageModule.forChild(TopRatedShowPage),
  ],
})
export class TopRatedShowPageModule {}
