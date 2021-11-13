import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { GlobalFunction } from '../global';
import { ApiManga } from '../api-manga';
import * as $ from 'jquery';

declare var window: any;

@Component({
  selector: 'app-view-manga',
  templateUrl: './view-manga.page.html',
  styleUrls: ['./view-manga.page.scss'],
})
export class ViewMangaPage implements OnInit {
  constructor(
    public modalController: ModalController,
    public globalFunction: GlobalFunction,
    public photoViewer: PhotoViewer,
    public apiManga: ApiManga
  ) { }

  public isTransitionSlide: boolean = false;
  public slideOpts = { initialSlide: 0, speed: 400, autoHeight: true, paginationClickable: false, loop: false };

  @Input() name: string;
  @Input() age: string;
  @Input() synopsis: string;
  @Input() genders: any[];
  @Input() type: string;
  @Input() url: any;
  @Input() img: any;
  @Input() chapters: any[];

  ngOnInit() { this.checkFavorite(); }

  downloadChapter(server, title) { this.globalFunction.downloadDirImages({ name: this.name, type: this.type, img: this.img }, server, title); }
  favButton() { if (this.apiManga.checkFavorite(this.url) == false) { this.apiManga.addFavorite({ name: this.name, age: this.age, type: this.type, url: this.url, img: this.img }); setTimeout(()=>{ this.checkFavorite(); window.pageFavorite.refresh(); }, 128); } else { this.apiManga.removeFavorite(this.url); setTimeout(()=>{ this.checkFavorite(); window.pageFavorite.refresh(); }, 128); } }
  checkFavorite() { if (this.apiManga.checkFavorite(this.url) !== false) { $('ion-button#favButton').find('ion-icon').attr('color', 'danger'); } else { $('ion-button#favButton').find('ion-icon').attr('color', ''); } }
  openPoster() { return this.photoViewer.show(this.img, this.name, { share: true }); }
  openChapter(servers, name) { return this.globalFunction.openDirImages(servers, name); }
  dismiss() { this.modalController.dismiss(); }
  changeSlide() { $('ion-slides#slideView')[0].getSwiper().then((e)=>{ if (e.activeIndex == 0) { $('ion-segment#segment-modal-view').attr('value', 'info'); } else { $('ion-segment#segment-modal-view').attr('value', 'chapters'); } }); }
  slideTransition() { this.isTransitionSlide = true; setTimeout(()=>{ this.isTransitionSlide = false; }, 410); }
  changeView($event) { if (this.isTransitionSlide == true) { return; } if ($event.detail.value == 'chapters') { $('ion-slides#slideView')[0].getSwiper().then((e)=>{ $('ion-slides#slideView')[0].slideTo(1); }); } else { $('ion-slides#slideView')[0].slideTo(0); } }
  errImagePoster($event) { console.log($event); }

}
