import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-popular-show',
  templateUrl: 'popular-show.html',
})
export class PopularShowPage {

  baseUrl: string = 'https://api.themoviedb.org/3/tv/';
  apiKey: string = '3fcdd7c1998d30710d73c25957e35bfb'; 

  popularShowsArr = [];

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.getPopularShow();
    this.getPopularShowPage2();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopularShowPage');
  }

  //page 1
  getPopularShow(){
    this.http.get(this.baseUrl + 'popular?api_key=' + this.apiKey).map(res => res.json()).subscribe(data => {
      this.popularShowsArr = data;
      console.log("popular shows ", this.popularShowsArr);
    });
  }

  //page2
  getPopularShowPage2(){
    this.http.get(this.baseUrl + 'popular?api_key=' + this.apiKey + '&page=2').map(res => res.json()).subscribe(data => {
      this.popularShowsArr = data;
      console.log("popular shows ", this.popularShowsArr);
    });
  }

}
