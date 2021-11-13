import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadsProgressPage } from './downloads-progress.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadsProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadsProgressPageRoutingModule {}
