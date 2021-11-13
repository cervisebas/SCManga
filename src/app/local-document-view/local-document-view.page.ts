import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FullScreenImage } from '@ionic-native/full-screen-image/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { PreviewImagePage } from '../preview-image/preview-image.page';
import { DocumentOptionsPopoverComponent } from '../@control/document-options-popover/document-options-popover.component';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { DownloadGlobal } from '../download';
import domtoimage from 'dom-to-image';
import JSPDF from 'jspdf';
import * as $ from 'jquery';

@Component({
  selector: 'app-local-document-view',
  templateUrl: './local-document-view.page.html',
  styleUrls: ['./local-document-view.page.scss'],
})
export class LocalDocumentViewPage implements OnInit {
  constructor(
    public modalController: ModalController,
    public pdfGenerator: PDFGenerator,
    public photoViewer: PhotoViewer,
    public fullScreenImage: FullScreenImage,
    public downloadGlobal: DownloadGlobal,
    public popoverController: PopoverController,
    public file: File
  ) { }
  public loadImgProgress: string = '0';
  public loadImgs: any = 0;
  public hideProgress: boolean = true;
  public headerLoadingDocument: string = 'Cargando...';
  @Input() images: any[];
  @Input() title: string;
  @Input() fileName: string;

  ngOnInit() {
    this.headerLoadingDocument = this.title;
  }

  async openOptions($event) {
    let popover = await this.popoverController.create({
      component: DocumentOptionsPopoverComponent,
      event: $event,
      translucent: true
    });
    await popover.present();
  }

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
  dismiss() { this.modalController.dismiss(); }
}
