import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
//import {TruncatePipe} from '../../pipes/truncate/truncate';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-popular-show',
  templateUrl: 'popular-show.html',
})

//pipes:[TruncatePipe];

export class PopularShowPage {

  baseUrl: string = 'https://api.themoviedb.org/3/tv/';
  apiKey: string = '3fcdd7c1998d30710d73c25957e35bfb'; 

  //img urls
  baseImgUrl: string = 'https://api.themoviedb.org/3/configuration?api_key=';

  popularShowsArr = [];
  popularShowsArr2 = [];
  baseImgUrlArr = [];

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.getPopularShow();
    this.getPopularShowPage2();
    this.getImgPath();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopularShowPage');
  }

  getImgPath(){
    this.http.get(this.baseImgUrl+this.apiKey).map(res => res.json()).subscribe((data) => {
      const baseimgurl = data.images.base_url;
      const imgSize = data.images.profile_sizes[1];
      this.baseImgUrlArr = baseimgurl + imgSize;
      console.log('from popular page', imgSize);
      console.log('from popular page', baseimgurl);
      console.log('from popular page', this.baseImgUrlArr);
    })
  }


  //page 1
  getPopularShow(){
    this.http.get(this.baseUrl + 'popular?api_key=' + this.apiKey).map(res => res.json()).subscribe(data => {
      this.popularShowsArr = data.results;
      console.log("popular shows ", this.popularShowsArr);
    });
  }

  //page2
  getPopularShowPage2(){
    this.http.get(this.baseUrl + 'popular?api_key=' + this.apiKey + '&page=2').map(res => res.json()).subscribe(data => {
      this.popularShowsArr2 = data.results;
      console.log("popular shows 2 ", this.popularShowsArr);
    });
  }

}
