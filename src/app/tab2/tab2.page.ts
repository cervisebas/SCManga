import { Component } from '@angular/core';
import { ApiManga } from '../api-manga';
import { GlobalFunction } from '../global';
import * as $ from 'jquery';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(
    public apiManga: ApiManga,
    public globalFunction: GlobalFunction
  ) {}
  public isClearVar: boolean = true;

  ngOnInit() {
    window.pageFavorite = this;
    $("#FavRefresher").on('ionRefresh',()=>{ this.refresh(); });
    $("#FavRefresher")[0].cancel();
    this.refresh();
  }
  refresh() {
    let favorites = this.apiManga.getFavorites();
    setTimeout(()=>{
      if (favorites !== false) {
        this.isClearVar = false;
        $("ion-list#FavList").show();
        $("ion-list#FavList").html('');
        favorites.forEach((element, index)=>{
          let elementItem = $("<ion-item button></ion-item button>").attr({button: 'true'}).append($("<ion-thumbnail></ion-thumbnail>").attr({slot: 'start', class: '2ion-thumbnail-you', style: 'width: 110px; height: 150px;'}).append($("<img>").attr({src: 'assets/img/loading-potrait.gif', class: '2img-loader-'+index })).append($("<img>").attr({src: 'assets/img/img-error-vertical.png', class: '2img-error-'+index, style: 'display: none;'})).append($("<img>").attr({src: element.img, style: 'display: none;', class: '2img-portada-pricipal-'+index, onload:()=>{  setTimeout(()=>{$('img.2img-loader-'+index).hide(); $('img.2img-portada-pricipal-'+index).show(); }, 1000); } }))).append($("<ion-label></ion-label>").append($("<h2></h2>").html(element.name)).append($("<p></p>").html(element.chapter)).append($("<p></p>").html(element.type)))
            .click((event)=>{ this.globalFunction.openView(element.url); });
          $("ion-list#FavList").append(elementItem);
        });
      } else {
        $("ion-list#FavList").hide();
        $("ion-list#FavList").html('');
        this.isClearVar = true;
      }
      setTimeout(()=>{ $("#FavRefresher")[0].complete(); }, 256);
    }, 128);
  }
  openListComplete() {
    console.log('Open list complete');
  }
}
