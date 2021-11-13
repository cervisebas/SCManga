import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Filesystem, Directory, Encoding, FilesystemDirectory } from '@capacitor/filesystem';
import { GlobalFunction } from '../global';
import { DocumentViewPage } from '../document-view/document-view.page';
import { LocalDocumentViewPage } from '../local-document-view/local-document-view.page';
import * as $ from 'jquery';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.page.html',
  styleUrls: ['./download-list.page.scss'],
})
export class DownloadListPage implements OnInit {
  constructor(
    public modalController: ModalController,
    public globalFunction: GlobalFunction,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  public loadingProgress: boolean = true;
  public loadingElement: any = 0;
  public isClearVar: boolean = false;

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.loadingProgress = true;
    this.loadingElement = 0;
    $('ion-content#downloads-list-page ion-list').html('');
    this.getFilesDir(async(files)=>{
      if (files.length == 0) { this.loadingProgress = false; return this.isClearVar = true; }
      $.each(files, async(index, element)=>{
        this.readJson(element, (result)=>{
          if (result['data'].length !== 0) {
            let content = JSON.parse(result['data']);
            this.setElement(this.loadingElement, atob(content['name']), content['poster'], atob(content['title']), content['imgs'], element);
          } else { this.loadingElement = this.loadingElement + 1; }
        });
      });
      let ifLoad = setInterval(()=>{
        if (files.length == this.loadingElement) {
          this.loadingProgress = false;
          return clearInterval(ifLoad);
        }
      }, 64);
    });
  }
  async readJson(file, result) {
    let contents = await Filesystem.readFile({
      path: file,
      directory: FilesystemDirectory.External,
      encoding: Encoding.UTF8,
    });
    result(contents);
  }
  setElement(id, title, img, text, imgs, file) {
    this.loadingElement = this.loadingElement + 1;
    let elementItem = $("<ion-item></ion-item>").attr({ 'id': 'download-'+id, 'button': 'true' }).append($("<ion-thumbnail></ion-thumbnail>").attr({slot: 'start', class: '2ion-thumbnail-you', style: 'width: 110px; height: 150px;'}).append($("<img>").attr({src: 'assets/img/loading-potrait.gif', class: '2img-loader-'+id })).append($("<img>").attr({src: 'assets/img/img-error-vertical.png', class: '2img-error-'+id, style: 'display: none;'})).append($("<img>").attr({src: img, style: 'display: none;', class: '2img-portada-pricipal-'+id, onload:()=>{  setTimeout(()=>{$('img.2img-loader-'+id).hide(); $('img.2img-portada-pricipal-'+id).show(); }, 1000); } }))).append($("<ion-label></ion-label>").append($("<h2></h2>").html(title)).append($("<p></p>").html(text))
      .append($('<ion-button></ion-button>').attr({ fill: 'clear', color: 'danger', class: 'click-clear-button' }).append($('<ion-label></ion-label>').html('Borrar')).append($('<ion-icon></ion-icon>').attr({ slot: 'icon-only', name: 'trash-outline' })))
      .click(async(e)=>{
        let alert = await this.alertController.create({
          header: 'Confirmar acción',
          message: '¿Estas seguro que quieres borrar este elemento?',
          buttons: [{ text: 'Cancelar', role: 'cancel' }, { text: 'Aceptar', handler: ()=>{ this.deleteFile(file); } }]
        });
        return await alert.present();
      }))
      .click(async(e)=>{
        if ((!$("ion-button.click-clear-button").is(e.target) && $("ion-button.click-clear-button").has(e.target).length === 0)) {
          let modal = await this.modalController.create({
            component: LocalDocumentViewPage,
            componentProps: { images: imgs, title: String(text+' - '+title), fileName: file }
          });
          return await modal.present();
        }
      });
    $('ion-content#downloads-list-page ion-list').append(elementItem);
  }
  async getFilesDir(result) {
    let files = [];
    let content = await Filesystem.readdir({
      path: '',
      directory: FilesystemDirectory.External
    }).then(async(dirs)=>{
      dirs.files.forEach(async(element, index)=>{
        if (element.indexOf('.json') !== -1) { files.push(element); }
      })
      result(files);
    });
  }
  async deleteFile(fileName) {
    let loading = await this.loadingController.create({ message: 'Espere por favor...' }); await loading.present();
    await Filesystem.deleteFile({
      path: fileName,
      directory: FilesystemDirectory.External
    }).then(async(e)=>{
      this.reload();
      return await loading.dismiss();
    });
  }
  async dismiss() { return await this.modalController.dismiss(); }
}