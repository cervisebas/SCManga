import { Component, Injectable } from '@angular/core';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import * as $ from 'jquery';
import { ApiManga } from './api-manga';
import { DownloadGlobal } from './download';
import { DocumentViewPage } from './document-view/document-view.page';
import { ViewMangaPage } from './view-manga/view-manga.page';

@Injectable()
export class GlobalFunction {
	constructor(
		public apiManga: ApiManga,
		public modalController: ModalController,
		public loadingController: LoadingController,
		public actionSheetController: ActionSheetController,
		public downloadGlobal: DownloadGlobal
	) {  }
	createPDF(images, element) {
		
	}
	async openView(url) {
		let loading = await this.loadingController.create({ message: 'Cargando información...' }); await loading.present();
		this.apiManga.getInfoManga(url, async(result)=>{
			let datas = result; datas['url'] = url;
			let modal = await this.modalController.create({
		      component: ViewMangaPage,
		      componentProps: datas
		    });
		    await modal.present();
			return await loading.dismiss();
		});
	}
	async openDirImages(servers, title) {
		let buttons = [];
		$.each(servers, (index, val)=>{ buttons.push({ text: val.name, icon: 'book-outline', handler:()=>{ this.openViewDocument(val.url, title); } }); });
		buttons.push({ text: 'Cancelar', icon: 'close', role: 'cancel' });
		const actionSheet = await this.actionSheetController.create({
			header: 'Elije una opción',
			buttons: buttons
		});
		await actionSheet.present();
	}
	async openViewDocument(url, title) {
		let loading = await this.loadingController.create({ message: 'Cargando información...' }); await loading.present();
		this.apiManga.getImagesChapters(url, async(result)=>{
			let modal = await this.modalController.create({
		      component: DocumentViewPage,
		      componentProps: { images: result, title: title }
		    });
		    await modal.present();
			return await loading.dismiss();
		});
	}
	async downloadDirImages(data: { name: string, type: string, img: any }, servers, title) {
		let buttons = [];
		$.each(servers, (index, val)=>{ buttons.push({ text: val.name, icon: 'download-outline', handler:()=>{ this.downloadChapterDocument(data, val.url, title); } }); });
		buttons.push({ text: 'Cancelar', icon: 'close', role: 'cancel' });
		const actionSheet = await this.actionSheetController.create({
			header: 'Elije una opción',
			buttons: buttons
		});
		await actionSheet.present();
	}
	async downloadChapterDocument(data: { name: string, type: string, img: any }, url, title) {
		let loading = await this.loadingController.create({ message: 'Cargando información...' }); await loading.present();
		this.apiManga.getImagesChapters(url, async(Images)=>{
			await loading.dismiss();
			this.downloadGlobal.goDownloadManga(data.name, title, data.type, Images, data.img, (result)=>{
				console.log(result);
			});
    	});
	}
}