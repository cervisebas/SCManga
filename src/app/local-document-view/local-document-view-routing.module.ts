import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalDocumentViewPage } from './local-document-view.page';

const routes: Routes = [
  {
    path: '',
    component: LocalDocumentViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalDocumentViewPageRoutingModule {}
