import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'view-manga',
    loadChildren: () => import('./view-manga/view-manga.module').then( m => m.ViewMangaPageModule)
  },
  {
    path: 'document-view',
    loadChildren: () => import('./document-view/document-view.module').then( m => m.DocumentViewPageModule)
  },
  {
    path: 'preview-image',
    loadChildren: () => import('./preview-image/preview-image.module').then( m => m.PreviewImagePageModule)
  },
  {
    path: 'downloads-progress',
    loadChildren: () => import('./downloads-progress/downloads-progress.module').then( m => m.DownloadsProgressPageModule)
  },
  {
    path: 'download-list',
    loadChildren: () => import('./download-list/download-list.module').then( m => m.DownloadListPageModule)
  },
  {
    path: 'local-document-view',
    loadChildren: () => import('./local-document-view/local-document-view.module').then( m => m.LocalDocumentViewPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
