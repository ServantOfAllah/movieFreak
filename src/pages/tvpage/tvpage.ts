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
  baseUrl: string = 'https://api.themoviedb.org/3/tv/';

  tvdetails = [];
  tvImageArr = [];
  tvSimilarArr = [];
  tvRecomArr = [];
  allTvDetailsArr = [];
  allTvDetailsArrCreator = [];
  showGenre = [];

  firstImgPath: string;
  fullImagePathSmall: string;
  allImgSizes: any;
  tvImgsId: string;
  fullImagePath:any;
  eachTvImg: string;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {

    this.getAllLinks();
    this.getImageType();
    this.getTvImages();
    this.getSimilarTvShows();
    this.getShowDetails();
    this.getRecommendTvShows();
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

  getShowDetails(){
    this.http.get(this.baseUrl + this.tvImgsId + '?api_key=' + this.apiKey).map(res => res.json())
    .subscribe(data => {
      this.allTvDetailsArr = [data];
      this.allTvDetailsArrCreator = data.created_by;
      this.showGenre = data.genres;
      console.log('all shoow creators', this.allTvDetailsArrCreator);
      console.log('all shoow details', this.allTvDetailsArr);
      console.log("show genres ",this.showGenre);
    });
  }
  getImageType(){
    this.fullImagePath = this.allImgSizes.base_url + this.allImgSizes.profile_sizes[3];
    console.log("full image path", this.fullImagePath);
    this.fullImagePathSmall = this.allImgSizes.base_url + this.allImgSizes.logo_sizes[1];
    console.log("full image path small", this.fullImagePathSmall);
    
  }
  getSimilarTvShows(){
    this.http.get(this.baseUrl + this.tvImgsId + '/similar?api_key=' + this.apiKey +'&append_to_response=videos')
    .map(res => res.json())
    .subscribe(data => {
      this.tvSimilarArr = data.results;
      console.log("similar tv shows", this.tvSimilarArr);
    })
  }
  getRecommendTvShows(){
    this.http.get(this.baseUrl + this.tvImgsId + '/recommendations?api_key=' + this.apiKey).map(res => res.json())
    .subscribe(data => {
      this.tvRecomArr = data.results;
      console.log("recomended tv shows", this.tvRecomArr);
    })
  }

  getTvImages(){
    this.http.get(this.baseUrl + this.tvImgsId + '/images?api_key=' + this.apiKey).map(res => res.json())
    .subscribe(data =>{
      this.tvImageArr = data.backdrops;
      console.log("all tv images", this.tvImageArr);
    })
  }

  navToShow(details){
    const tvdetails = this.navCtrl.push('TvpagePage', { 
      tvDetails: details, 
      firstImgPath: this.firstImgPath, 
      allSizes: this.allImgSizes 
    })
    console.log(tvdetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TvpagePage');
  }

}
