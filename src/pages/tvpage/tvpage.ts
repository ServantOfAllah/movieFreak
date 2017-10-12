import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-tvpage',
  templateUrl: 'tvpage.html',
})
export class TvpagePage {

  apiKey: string = '3fcdd7c1998d30710d73c25957e35bfb';
  tvImgUrl: string = 'https://api.themoviedb.org/3/tv/';

  tvdetails = [];
  tvImageArr = [];

  firstImgPath: string;
  allImgSizes: any;
  tvImgsId: string;
  fullImagePath:any;
  eachTvImg: string;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {

    this.getAllLinks();
    this.getPostalImage();
    this.getTvImages();
    
  }

  getAllLinks(){
    this.tvdetails = [this.navParams.get('tvDetails')];
    console.log('show details', this.tvdetails);

    this.firstImgPath = this.navParams.get('firstImgPath');
    console.log('img first file path', this.firstImgPath);

    this.allImgSizes = this.navParams.get('allSizes');
    console.log('img all sizes', this.allImgSizes);

    this.tvImgsId = this.navParams.get('tvDetails').id;
    console.log('tv images id', this.tvImgsId);
    
    this.eachTvImg = this.firstImgPath;
    console.log('each img ', this.eachTvImg);
  }

  getPostalImage(){
    this.fullImagePath = this.allImgSizes.base_url + this.allImgSizes.profile_sizes[2];
    console.log("full image path", this.fullImagePath);
  }
  getTvImages(){
    this.http.get(this.tvImgUrl + this.tvImgsId + '/images?api_key=' + this.apiKey).map(res => res.json()).subscribe(data =>{
      this.tvImageArr = data.backdrops;
      console.log("all tv images", this.tvImageArr);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TvpagePage');
  }

}
