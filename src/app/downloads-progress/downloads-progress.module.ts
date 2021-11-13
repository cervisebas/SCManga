import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadsProgressPageRoutingModule } from './downloads-progress-routing.module';

import { DownloadsProgressPage } from './downloads-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadsProgressPageRoutingModule
  ],
  declarations: [DownloadsProgressPage]
})
export class DownloadsProgressPageModule {}
