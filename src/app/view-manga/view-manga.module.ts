import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMangaPageRoutingModule } from './view-manga-routing.module';

import { ViewMangaPage } from './view-manga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMangaPageRoutingModule
  ],
  declarations: [ViewMangaPage]
})
export class ViewMangaPageModule {}
