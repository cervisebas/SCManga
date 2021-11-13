import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { ApiManga } from '../api-manga';
import { GlobalFunction } from '../global';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(
    public apiManga: ApiManga,
    public globalFunction: GlobalFunction,
    public toastController: ToastController
  ) {}
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public pageNum: any = 1;
  public hideProgress: boolean = true;
  public valueSearch: string;
  public isClearVar: boolean = true;

  filterGender() {
    console.log('Filter button');
  }
  search($event) {
    this.pageNum = 1;
    this.hideProgress = false;
    this.valueSearch = $event.srcElement.value;
    this.infiniteScroll.disabled = false;
    this.apiManga.getSearch(String(this.pageNum), $event.srcElement.value, async(results)=>{
      if (results == false) { let toast = await this.toastController.create({ message: 'Ha ocurrido un error, intentalo nuevamente.', duration: 2500 }); this.hideProgress = true; this.isClearVar = true; return await toast.present(); }
      if (results == []) { this.hideProgress = true; return this.isClearVar = true; }
      this.isClearVar = false;
      $("ion-list#list-search").html('');
      results.forEach((element, index)=>{
        let elementItem = $("<ion-item button></ion-item button>").attr({button: 'true'}).append($("<ion-thumbnail></ion-thumbnail>").attr({slot: 'start', class: '2ion-thumbnail-you', style: 'width: 110px; height: 150px;'}).append($("<img>").attr({src: 'assets/img/loading-potrait.gif', class: '2img-loader-'+index })).append($("<img>").attr({src: 'assets/img/img-error-vertical.png', class: '2img-error-'+index, style: 'display: none;'})).append($("<img>").attr({src: element.img, style: 'display: none;', class: '2img-portada-pricipal-'+index, onload:()=>{ setTimeout(()=>{$('img.2img-loader-'+index).hide(); $('img.2img-portada-pricipal-'+index).show(); }, 1000); } }))).append($("<ion-label></ion-label>").append($("<h2></h2>").html(element.name)).append($("<p></p>").html(element.type)))
          .click((event)=>{ this.globalFunction.openView(element.url); });
        $("ion-list#list-search").append(elementItem);
      });
      return this.hideProgress = true;
    });
  }
  loadMoreData($event) {
    this.pageNum = this.pageNum + 1;
    this.apiManga.getSearch(String(this.pageNum), this.valueSearch, async(results)=>{
      if (results == false) { let toast = await this.toastController.create({ message: 'Ha ocurrido un error, intentalo nuevamente.', duration: 2500 }); $event.target.complete(); return await toast.present(); }
      if (results.length == 0) { return this.infiniteScroll.disabled = true; }
      results.forEach((element, index)=>{
        let elementItem = $("<ion-item button></ion-item button>").attr({button: 'true'}).append($("<ion-thumbnail></ion-thumbnail>").attr({slot: 'start', class: '2ion-thumbnail-you', style: 'width: 110px; height: 150px;'}).append($("<img>").attr({src: 'assets/img/loading-potrait.gif', class: '2img-loader-'+index })).append($("<img>").attr({src: 'assets/img/img-error-vertical.png', class: '2img-error-'+index, style: 'display: none;'})).append($("<img>").attr({src: element.img, style: 'display: none;', class: '2img-portada-pricipal-'+index, onload:()=>{ setTimeout(()=>{$('img.2img-loader-'+index).hide(); $('img.2img-portada-pricipal-'+index).show(); }, 1000); } }))).append($("<ion-label></ion-label>").append($("<h2></h2>").html(element.name)).append($("<p></p>").html(element.type)))
          .click((event)=>{ this.globalFunction.openView(element.url); });
        $("ion-list#list-search").append(elementItem);
      });
      return $event.target.complete();
    }); 
  }
}
