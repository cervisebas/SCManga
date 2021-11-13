import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadListPageRoutingModule } from './download-list-routing.module';

import { DownloadListPage } from './download-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadListPageRoutingModule
  ],
  declarations: [DownloadListPage]
})
export class DownloadListPageModule {}
