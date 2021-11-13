import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DownloadGlobal } from '../download';
import * as $ from 'jquery';

declare var window: any;

@Component({
  selector: 'app-downloads-progress',
  templateUrl: './downloads-progress.page.html',
  styleUrls: ['./downloads-progress.page.scss'],
})
export class DownloadsProgressPage implements OnInit {
  constructor(
    public modalController: ModalController,
    public downloadGlobal: DownloadGlobal
  ) { }

  public isClearVar: boolean = true;

  ngOnInit() {
    window.thenDownloadProgressPage = this;
    setInterval(()=>{
      let list = this.downloadGlobal.checkListDownload();
      if (list !== false) {
        this.verifyElements(list);
        this.updateElement(list);
        this.verifyFinish(list);
        this.isClearVar = false;
      } else {
        this.isClearVar = true;
        $('ion-content#downloads-progress-page ion-list').html('');
      }
    }, 128);
  }

  setElement(id, title, img, text, progress, status) {
    let progress2 = ''; if (status == true) { progress2 = progress+'%'; } else { progress2 = progress2 = '<b style="color: var(--ion-color-danger);">'+progress+'% (Error)</b><b style="color: var(--ion-color-warning);margin-left: 6px;" onclick="window.thenDownloadProgressPage.deleteFailDownload('+id+');">(Eliminar)</b>'; }
    let elementItem = $("<ion-item></ion-item>").attr('id', 'download-'+id).append($("<ion-thumbnail></ion-thumbnail>").attr({slot: 'start', class: '2ion-thumbnail-you', style: 'width: 110px; height: 150px;'}).append($("<img>").attr({src: 'assets/img/loading-potrait.gif', class: '2img-loader-'+id })).append($("<img>").attr({src: 'assets/img/img-error-vertical.png', class: '2img-error-'+id, style: 'display: none;'})).append($("<img>").attr({src: img, style: 'display: none;', class: '2img-portada-pricipal-'+id, onload:()=>{  setTimeout(()=>{$('img.2img-loader-'+id).hide(); $('img.2img-portada-pricipal-'+id).show(); }, 1000); } }))).append($("<ion-label></ion-label>").append($("<h2></h2>").html(title)).append($("<p></p>").html(text)).append($("<ion-progress-bar></ion-progress-bar>").attr({ style: 'margin-top: 15px;', value: (progress/100).toFixed(2) })).append($("<p></p>").attr('class', 'progress').html('Progreso: '+progress2)));
    $('ion-content#downloads-progress-page ion-list').append(elementItem);
  }
  verifyElements(array) {
    $.each(array, (index, val)=>{
      let element = $('ion-item#download-'+val.id).length;
      if (element == 0) {
        this.setElement(val.id, val.text, val.img, val.title, val.progress, val.status);
      }
    });
  }
  verifyFinish(array) {
    $('ion-content#downloads-progress-page ion-list ion-item').each((index, element)=>{
      let search = false;
      $.each(array, (index, val)=>{
        if ($(element).attr('id') == 'download-'+val.id) {
          search = true;
        }
      });
      if (search == false) {
        $(element).remove();
      }
    });
  }
  updateElement(array) {
    $.each(array, (index, val)=>{
      let progress2 = '';
      if (val.status == true) { 
        progress2 = val.progress+'%'; 
      } else { 
        progress2 = '<b style="color: var(--ion-color-danger);">'+val.progress+'% (Error)</b><b style="color: var(--ion-color-warning);margin-left: 6px;" onclick="window.thenDownloadProgressPage.deleteFailDownload('+val.id+');">(Eliminar)</b>';
      }
      $('ion-item#download-'+val.id).find('ion-label').find('ion-progress-bar').attr('value', (val.progress/100).toFixed(2));
      $('ion-item#download-'+val.id).find('ion-label').find('p.progress').html('Progreso: '+progress2);
    });
  }
  deleteFailDownload(id) { return this.downloadGlobal.deleteError(id); }
  async dismiss() { return await this.modalController.dismiss(); }
}
