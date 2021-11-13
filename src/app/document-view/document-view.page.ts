import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FullScreenImage } from '@ionic-native/full-screen-image/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { PreviewImagePage } from '../preview-image/preview-image.page';
import domtoimage from 'dom-to-image';
import { DownloadGlobal } from '../download';
import * as $ from 'jquery';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.page.html',
  styleUrls: ['./document-view.page.scss'],
})
export class DocumentViewPage implements OnInit {
  constructor(
    public modalController: ModalController,
    public pdfGenerator: PDFGenerator,
    public photoViewer: PhotoViewer,
    public fullScreenImage: FullScreenImage,
    public downloadGlobal: DownloadGlobal
  ) { }
  public loadImgProgress: string = '0';
  public loadImgs: any = 0;
  public hideProgress: boolean = false;
  public headerLoadingDocument: string = 'Cargando...';
  @Input() images: any[];
  @Input() title: string;

  ngOnInit() {
    let interval = setInterval(()=>{
      let progress = ((this.loadImgs * 100) / this.images.length);
      this.headerLoadingDocument = ('Cargando: '+String(this.loadImgs)+'/'+String(this.images.length)+' ('+progress.toFixed(0)+'%)');
      let progress2 = (progress / 100);
      let progress3 = progress2.toFixed(2);
      this.loadImgProgress = String(progress3);
      if (progress == 100) { 
        clearInterval(interval);
        this.hideProgress = true;
        this.headerLoadingDocument = ('Carga completa!!!');
        setTimeout(()=>{ this.headerLoadingDocument = this.title; }, 3000);
      }
    }, 128);
  }

  dismiss() { this.modalController.dismiss(); }

  async openImage(image, number) {
    let title = 'Imagen #'+(number+1);
    let modal = await this.modalController.create({
      component: PreviewImagePage,
      cssClass: 'transparent-modal',
      componentProps: { img: image },
      swipeToClose: true
    });
    return await modal.present();
  }
  
  loadImg($event) {
    let progress = (this.loadImgs + 1);
    this.loadImgs = progress;
  }

}
