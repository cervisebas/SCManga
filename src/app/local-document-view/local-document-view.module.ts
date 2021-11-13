import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalDocumentViewPageRoutingModule } from './local-document-view-routing.module';

import { LocalDocumentViewPage } from './local-document-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalDocumentViewPageRoutingModule
  ],
  declarations: [LocalDocumentViewPage]
})
export class LocalDocumentViewPageModule {}
