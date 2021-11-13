import { Component, Injectable } from '@angular/core';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { File } from '@ionic-native/file/ngx';
import { Filesystem, Directory, Encoding, FilesystemDirectory } from '@capacitor/filesystem';
import { Plugins } from '@capacitor/core';
import * as $ from 'jquery';

var downloadsList: any[] = [];

@Injectable()
export class DownloadGlobal {
	constructor(
		public transfer: FileTransfer,
		public file: File,
		public diagnostic: Diagnostic
	) {  }
	async goDownloadManga(name, title, type, images, poster, result) {
		let imgs = []; $.each(images, (index, val)=>{ imgs.push('image-'+String(index)+'.jpg'); });
		let datas = { name: btoa(name), title: btoa(title), type: btoa(type), poster: poster, imgs: imgs };
		let id = (Math.random() * 999999999).toFixed(0);
		this.checkStorageGet(async(directory)=>{
			this.setProgressList(id, title, poster, name, 1, true);
			let resultPoster = await this.saveImage('https://api.allorigins.win/raw?url='+poster);
			if (resultPoster !== false) { datas.poster = resultPoster; } else { return this.setProgressList(id, title, poster, name, 1, false); }
			let resultImgs = [];
			for (var i=0; i < images.length; i++) {
				let save = await this.saveImage('https://api.allorigins.win/raw?url='+images[i]);
				console.log('Descargando: '+String((i+1))+'/'+String(images.length));
				let progress = (((i+1)*100)/images.length).toFixed(0);
				if (save !== false) { this.setProgressList(id, title, poster, name, progress, true); } else { return this.setProgressList(id, title, poster, name, progress, false); }
				await resultImgs.push(save);
			}
			console.log('Complete');
			datas.imgs = resultImgs;
			this.file.writeFile(this.file.externalDataDirectory, this.createIdName(name)+'.json', JSON.stringify(datas), { replace: true })
				.then((success)=>{
					console.log(success);
					this.setProgressList(id, title, poster, name, false, true);
					resultPoster = null;
					resultImgs = null;
					imgs = null;
					datas = null;
				}).catch((error)=>{
					console.log(error);
					this.setProgressList(id, title, poster, name, 100, false);
					resultPoster = null;
					resultImgs = null;
					imgs = null;
					datas = null;
				});
			/*let write = await Filesystem.writeFile({path: this.createIdName(name)+'.json', directory: FilesystemDirectory.External, data: JSON.stringify(datas), encoding: Encoding.UTF8 }).then((success)=>{}).catch((error)=>{});*/
		});
	}
	async saveImage(imgUrl) {
		return new Promise(async(resolve)=>{
			let img = new Image();
			img.crossOrigin = 'Anonymous';
			img.onload = function(){
				let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
				ctx = canvas.getContext('2d'),
				dataURL;
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img, 0, 0);
				dataURL = canvas.toDataURL("image/jpeg");
				canvas = null;
				resolve(dataURL); 
			};
			img.onerror = function(){
				resolve(false);
			}
			img.src = imgUrl;
		});
	}
	createDirGet(name, result) {
		this.checkStorageGet((storage)=>{
			this.file.createDir(this.file.externalDataDirectory, name, true)
		      .then((e)=>result(e))
		      .catch((e)=>console.log(e));
		});
	}
	checkStorageGet(result) {
		function reverse(s) { return s.split("").reverse().join(""); }
		if (localStorage.getItem('storage') === null) { result(this.file.externalDataDirectory); }
		if (localStorage.getItem('storage') == '0') { result(this.file.externalDataDirectory); }
		if (localStorage.getItem('storage') == '1') { this.diagnostic.getExternalSdCardDetails().then((sdInfo)=>{ $.each(sdInfo, (index, val)=>{ if (val.type == "application") { result(val.filePath); } }); }); }
	}
	createIdName(string) {
		let temp0 = String(string).toLowerCase();
		let temp1 = temp0.replace(/\"/gi, '').replace(/\'/gi, '').replace(/\?/gi, '').replace(/\¿/gi, '').replace(/\¡/gi, '').replace(/\!/gi, '').replace(/\#/gi, '').replace(/\$/gi, '').replace(/\%/gi, '').replace(/\&/gi, '').replace(/\//gi, '').replace(/\(/gi, '').replace(/\)/gi, '').replace(/\=/gi, '').replace(/\¨/gi, '').replace(/\+/gi, '').replace(/\*/gi, '').replace(/\~/gi, '').replace(/\{/gi, '').replace(/\}/gi, '').replace(/\[/gi, '').replace(/\]/gi, '').replace(/\^/gi, '').replace(/\`/gi, '').replace(/\,/gi, '').replace(/\;/gi, '').replace(/\./gi, '').replace(/\:/gi, '').replace(/\-/gi, '').replace(/\_/gi, '').replace(/\</gi, '').replace(/\>/gi, '').replace(/\|/gi, '').replace(/\°/gi, '').replace(/\¬/gi, '').replace(/\@/gi, '').replace(/\á/gi, 'a').replace(/\ä/gi, 'a').replace(/\à/gi, 'a').replace(/\â/gi, 'a').replace(/\é/gi, 'e').replace(/\ë/gi, 'e').replace(/\è/gi, 'e').replace(/\ê/gi, 'e').replace(/\í/gi, 'i').replace(/\ï/gi, 'i').replace(/\ì/gi, 'i').replace(/\î/gi, 'i').replace(/\ó/gi, 'o').replace(/\ö/gi, 'o').replace(/\ò/gi, 'o').replace(/\ô/gi, 'o').replace(/\ú/gi, 'u').replace(/\ü/gi, 'u').replace(/\ù/gi, 'u').replace(/\û/gi, 'u');
		let temp2 = String((Math.random() * 999999999).toFixed(0));;
		return String(temp1.replace(/\ /gi, '-'))+'-'+temp2;
	}
	setProgressList(id, title, img, text, progress, status) {
		function arrayRemove(arr, value) { return arr.filter(function(ele){ return ele.id != value; }); }
		let search = downloadsList.findIndex(element => element['id'] === id);
		if (search !== -1) {
			if (progress == false) { return downloadsList = arrayRemove(downloadsList, id); }
			downloadsList[search]['progress'] = progress;
			downloadsList[search]['status'] = status;
		} else {
			downloadsList.push({ id: id, title: title, img: img, text: text, progress: progress, status: status });
		}
	}
	checkListDownload() {
		if (downloadsList.length !== 0) {
			return downloadsList;
		} else {
			return false;
		}
	}
	deleteError(id) {
		function arrayRemove(arr, value) { return arr.filter(function(ele){ return ele.id != value; }); }
		return downloadsList = arrayRemove(downloadsList, id);
	}
}