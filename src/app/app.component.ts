import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StatusBar, Style, StatusBarStyle } from '@capacitor/status-bar';
import { NavigationBarColor } from 'ionic-navigationbar-color';
import { File } from '@ionic-native/file/ngx';
import { ApiSCApps } from './api-scapps';
import { ApiManga } from './api-manga';
import { DownloadGlobal } from './download';
import { GlobalFunction } from './global';
import { Filesystem, Directory, Encoding, FilesystemDirectory } from '@capacitor/filesystem';
import { Plugins } from '@capacitor/core';
import { App } from '@capacitor/app';
import { DownloadsProgressPage } from './downloads-progress/downloads-progress.page';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import * as $ from 'jquery';

const { LocalNotifications } = Plugins;

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public apiManga: ApiManga,
    public apiSCApps: ApiSCApps,
    public globalFunction: GlobalFunction,
    public navigationBarColor: NavigationBarColor,
    public modalController: ModalController,
    public downloadGlobal: DownloadGlobal,
    public file: File,
    public backgroundMode: BackgroundMode
  ) {}

  public isDownloadsProgress: boolean = false;
  public lengthDownloads: any = 0;

  async ngOnInit() {
    StatusBar.setStyle({ style: StatusBarStyle.Dark });
    StatusBar.setBackgroundColor({ color: '#FF5733' });
    this.navigationBarColor.backgroundColorByHexString('#FF5733', false);
    this.checkDarkMode();
    this.apiSCApps.verifyUpdate(false);
    LocalNotifications.cancel({ notifications: [{ id: 255 }] });

    setInterval(()=>{
      let list = this.downloadGlobal.checkListDownload();
      if (list !== false) {
        if (this.isDownloadsProgress !== true || this.lengthDownloads !== list.length) { this.setNotification(true, list.length); this.lengthDownloads = list.length; }
        this.isDownloadsProgress = true;
      } else {
        if (this.isDownloadsProgress !== false) { this.setNotification(false, 0); this.lengthDownloads = 0; }
        this.isDownloadsProgress = false;
      }
    }, 256);
  }
  ngOnDestroy() {
    LocalNotifications.cancel({ notifications: [{ id: 255 }] });
  }
  async setNotification(download, progress) {
    if (download !== false) {
      LocalNotifications.schedule({ 
        notifications: [{ 
            id: 255,
            title: 'Hay descargas en curso',
            body: 'Descargando '+progress+' en lista.',
            sound: 'silent.wav',
            smallIcon: 'icon_notification.png',
            iconColor: '#FF5733',
            ongoing: true
        }]
      });
    } else {
      LocalNotifications.schedule({ 
        notifications: [{ 
            id: 255,
            title: 'Descargas completas',
            body: 'Lista de descargas vacía.',
            sound: 'silent.wav',
            smallIcon: 'icon_notification.png',
            iconColor: '#FF5733',
            ongoing: false
        }]
      });
    }
  }
  checkDarkMode() {
    if (localStorage.getItem('dark-mode') == 'true') {
      $("body").toggleClass('dark', localStorage.getItem('dark-mode'));
    }
  }
  async openViewDownloads() {
    let modal = await this.modalController.create({ component: DownloadsProgressPage });
    return await modal.present();
  }
}
