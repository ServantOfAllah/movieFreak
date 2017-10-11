import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tvpage',
  templateUrl: 'tvpage.html',
})
export class TvpagePage {

  tvdetails = [];
  firstImgPath: string;
  allImgSizes: any;
  fullImagePath:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.getAllLinks();
    this.getPostalImage();
    
  }

  getAllLinks(){
    this.tvdetails = [this.navParams.get('tvDetails')];
    console.log('show details', this.tvdetails);
    this.firstImgPath = this.navParams.get('firstImgPath');
    console.log('img file path', this.firstImgPath);
    this.allImgSizes = this.navParams.get('allSizes');
    console.log('img all sizes', this.allImgSizes);
  }
  getPostalImage(){
    this.fullImagePath = this.allImgSizes.base_url + this.allImgSizes.profile_sizes[2];
    console.log("full image path", this.fullImagePath);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TvpagePage');
  }

}
