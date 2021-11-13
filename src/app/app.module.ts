import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationBarColor } from 'ionic-navigationbar-color';
import { HTTP } from '@ionic-native/http/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { FullScreenImage } from '@ionic-native/full-screen-image/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { File } from '@ionic-native/file/ngx';

import { ViewMangaPageModule } from './view-manga/view-manga.module';
import { DocumentViewPageModule } from './document-view/document-view.module';
import { LocalDocumentViewPageModule } from './local-document-view/local-document-view.module';
import { PreviewImagePageModule } from './preview-image/preview-image.module';
import { DownloadsProgressPageModule } from './downloads-progress/downloads-progress.module';
import { DownloadListPageModule } from './download-list/download-list.module';

import { DocumentOptionsPopoverComponent } from './@control/document-options-popover/document-options-popover.component';

import { ApiManga } from './api-manga';
import { GlobalFunction } from './global';
import { DownloadGlobal } from './download';
import { ApiSCApps } from './api-scapps';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [AppComponent, DocumentOptionsPopoverComponent],
  entryComponents: [DocumentOptionsPopoverComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    FontAwesomeModule,
    AppRoutingModule,
    ViewMangaPageModule,
    DocumentViewPageModule,
    PreviewImagePageModule,
    DownloadsProgressPageModule,
    DownloadListPageModule,
    LocalDocumentViewPageModule
  ],
  providers: [
    ApiManga,
    ApiSCApps,
    GlobalFunction,
    DownloadGlobal,
    HTTP,
    FileTransfer,
    FileTransferObject,
    File,
    Diagnostic,
    BackgroundMode,
    LocalNotifications,
    NavigationBarColor,
    PhotoViewer,
    FullScreenImage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
