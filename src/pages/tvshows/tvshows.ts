import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-tvshows',
  templateUrl: 'tvshows.html',
})
export class TvshowsPage {

  @ViewChild('imgSlides') imgSlide: Slides;

  apiKey: string = '3fcdd7c1998d30710d73c25957e35bfb';
  airingTodayBaseUrl: string = 'https://api.themoviedb.org/3/tv/airing_today?api_key=';
  baseImgUrlConfig: string = 'https://api.themoviedb.org/3/configuration?api_key=';
  searchUrl: string = 'https://api.themoviedb.org/3/search/tv?page=1&api_key=';

  seriesArr = [];
  searchResults = [];
  imgConfigPath: any;
  firstImgPath: string;
  allImgSizes: any;

  popularShowaBaseUrl: string = 'https://api.themoviedb.org/3/tv/popular?api_key=';
  popularShowsArr = [];

  topRatedBaseUrl: string = 'https://api.themoviedb.org/3/tv/top_rated?api_key=';
  topRatedArr = [];
  searchInput: string;


  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.getAiringSeries();
    this.getImgConfig();
    this.getPopularShow();
    this.getTopRatedShow();
  }

  getAiringSeries(){
    this.http.get(this.airingTodayBaseUrl+this.apiKey).map(res => res.json()).subscribe(data =>{
      this.seriesArr = data.results;
      console.log('all series poster path ', this.seriesArr);
      console.log('all series poster path type of ', typeof(this.seriesArr));
    })
  }

  getPopularShow(){
    this.http.get(this.popularShowaBaseUrl+this.apiKey).map(res => res.json()).subscribe(data => {
      this.popularShowsArr = data.results;
      console.log("popular shows ", this.popularShowsArr);
    })
  }

  getTopRatedShow(){
    this.http.get(this.topRatedBaseUrl+this.apiKey).map(res => res.json()).subscribe(data =>{
      this.topRatedArr = data.results;
      console.log("top rated shows ", this.topRatedArr);
    })
  }
  getSearch(){
    this.http.get(this.searchUrl + this.apiKey + '&query=' + this.searchInput).map(res => res.json()).subscribe(data => {
      this.searchResults = data.results;
      console.log('serach results ', this.searchResults);
    })
  }
  filterItems(ev: any){
    this.getSearch();
    let val = ev.target.value;
    if(val && val.trim() != ''){
      this.searchResults = this.searchResults.filter(function(item){
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
  }
  onClear(){
    this.searchResults = [];
  }

  getImgConfig(){
    this.http.get(this.baseImgUrlConfig+this.apiKey).map(res =>res.json()).subscribe(data => {
      this.firstImgPath = data.images.base_url;
      this.allImgSizes = data.images
      const imgSize = data.images.logo_sizes[1];
      console.log(data);
      console.log(this.firstImgPath);
      console.log(imgSize);
      console.log("All sizes ", this.allImgSizes);
      this.imgConfigPath = this.firstImgPath+imgSize;
      console.log("img full path ", this.imgConfigPath);
    })
  }

  navToShow(details){
    const tvdetails = this.navCtrl.push('TvpagePage', { tvDetails: details, firstImgPath: this.firstImgPath, allSizes: this.allImgSizes })
    console.log(tvdetails);
  }

  searchItems($event){
  }

  ionViewDidLoad() {
    setInterval(() =>{
      this.imgSlide.slideNext();
    }, 2000)
  }

}
