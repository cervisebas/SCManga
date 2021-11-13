import { Component, OnInit } from '@angular/core';
import { DownloadListPage } from '../download-list/download-list.page';
import { ModalController } from '@ionic/angular';
import { ApiSCApps } from '../api-scapps';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  constructor(
    public modalController: ModalController,
    public apiSCApps: ApiSCApps
  ) { }

  ngOnInit() {
    $("#themeToggle").on('ionChange', (event)=>{ $("body").toggleClass('dark', event.detail.checked); checkToggle(event.detail.checked); });
    function loadApp() { if (localStorage.getItem("dark-mode") === null) { return checkToggle(false); } checkToggle(localStorage.getItem("dark-mode")); }
    function checkToggle(shouldCheck) { $("#themeToggle")[0].checked = shouldCheck; localStorage.setItem("dark-mode", shouldCheck); }
    loadApp();
  }

  checkUpdates() { this.apiSCApps.verifyUpdate(true); }

  async openViewDownloads() {
    let modal = await this.modalController.create({ component: DownloadListPage });
    return await modal.present();
  }
}
