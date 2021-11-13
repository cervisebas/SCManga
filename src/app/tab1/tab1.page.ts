import { Component } from '@angular/core';
import { ApiManga } from '../api-manga';
import { GlobalFunction } from '../global';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    public apiManga: ApiManga,
    public globalFunction: GlobalFunction
  ) {}
  
  public slideOpts = { initialSlide: 0, speed: 400, autoHeight: true };
  public isTransitionSlide: boolean = false;

  ngOnInit() {
    $("#HomeRefresher").on('ionRefresh',()=>{ this.refresh(); });
    $("#HomeRefresher")[0].cancel();
    this.refresh();
  }

  refresh() {
    this.apiManga.getRecents((newsMangasResult)=>{
      setTimeout(()=>{
        $("ion-slides#list-recents ion-slide.uploads ion-list").html('');
        newsMangasResult.forEach((element, index)=>{
          let elementItem = $("<ion-item button></ion-item>").attr({button: 'true'}).append($("<ion-thumbnail></ion-thumbnail>").attr({slot: 'start', class: '2ion-thumbnail-you', style: 'width: 110px; height: 150px;'}).append($("<img>").attr({src: 'assets/img/loading-potrait.gif', class: '2img-loader-'+index })).append($("<img>").attr({src: 'assets/img/img-error-vertical.png', class: '2img-error-'+index, style: 'display: none;'})).append($("<img>").attr({src: element.img, style: 'display: none;', class: '2img-portada-pricipal-'+index, onload:()=>{  setTimeout(()=>{$('img.2img-loader-'+index).hide(); $('img.2img-portada-pricipal-'+index).show(); }, 1000); } }))).append($("<ion-label></ion-label>").append($("<h2></h2>").html(element.name)).append($("<p></p>").html(element.chapter)).append($("<p></p>").html(element.type)))
            .click((event)=>{ this.globalFunction.openView(element.url); });
          $("ion-slides#list-recents ion-slide.uploads ion-list").append(elementItem);
        });
        setTimeout(()=>{ this.checkSlide(); }, 512);
      }, 256);
    }, (newsAddsResult)=>{
      setTimeout(()=>{
        $("ion-slides#list-recents ion-slide.adds ion-list").html('');
        newsAddsResult.forEach((element, index)=>{
          let elementItem = $("<ion-item button></ion-item>").attr({button: 'true'}).append($("<ion-thumbnail></ion-thumbnail>").attr({slot: 'start', class: '2ion-thumbnail-you', style: 'width: 110px; height: 150px;'}).append($("<img>").attr({src: 'assets/img/loading-potrait.gif', class: '2img-loader-'+index })).append($("<img>").attr({src: 'assets/img/img-error-vertical.png', class: '2img-error-'+index, style: 'display: none;'})).append($("<img>").attr({src: element.img, style: 'display: none;', class: '2img-portada-pricipal-'+index, onload:()=>{ setTimeout(()=>{$('img.2img-loader-'+index).hide(); $('img.2img-portada-pricipal-'+index).show(); }, 1000); } }))).append($("<ion-label></ion-label>").append($("<h2></h2>").html(element.name)).append($("<p></p>").html(element.type)))
            .click((event)=>{ this.globalFunction.openView(element.url); });
          $("ion-slides#list-recents ion-slide.adds ion-list").append(elementItem);
        });
        $("#HomeRefresher")[0].complete();
      }, 256);
    });
  }

  changeSlide() { $('ion-slides#list-recents')[0].getSwiper().then((e)=>{ if (e.activeIndex == 0) { $('ion-segment').attr('value', 'uploads'); this.checkSlide(); } else { $('ion-segment').attr('value', 'adds'); this.checkSlide(); } }); }
  slideTransition() { this.isTransitionSlide = true; setTimeout(()=>{ this.isTransitionSlide = false; }, 410); }
  changeView($event) { if (this.isTransitionSlide == true) { return; } if ($event.detail.value == 'adds') { $('ion-slides#list-recents')[0].getSwiper().then((e)=>{ $('ion-slides#list-recents')[0].slideTo(1); this.checkSlide(); }); } else { $('ion-slides#list-recents')[0].slideTo(0); this.checkSlide(); } }
  checkSlide() { setTimeout(()=>{ $('#list-recents > div.swiper-scrollbar').css('display', 'none'); $('ion-slides#list-recents')[0].getSwiper().then((e)=>{ if (e.activeIndex == 1) { $('ion-slides#list-recents')[0].updateAutoHeight(); } else { $('#list-recents > div.swiper-wrapper').css('height', 'auto'); } }); }, 390); }
}
