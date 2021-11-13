import { Component, Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Toast } from '@capacitor/toast';
import { HTTP } from '@ionic-native/http/ngx';
import * as $ from 'jquery';

@Injectable()
export class ApiSCApps {
	constructor(
		public http: HTTP,
		public alertController: AlertController,
		public toastController: ToastController
	) {  }
	checkUpdate(result) {
		this.http.get('http://api.scapps.ga/scmanga.php', {}, {}).then(async(html)=>{
			var datas: { url: string, version: string } = JSON.parse(html.data);
			await App.getInfo().then((info)=>{
				if (info.version == datas.version) {
					result(false, datas.version, datas.url, info.version);
				} else {
					result(true, datas.version, datas.url, info.version);
				}
		    });
		}).catch((error)=>{
			result(false, false, false, false);
		});
	}
	verifyUpdate(consult) {
		this.checkUpdate(async(check, lastVersion, lastUrl, oldVersion)=>{
	      if (check === false && lastVersion === false && lastUrl === false && oldVersion === false) {
	      	let toast = await this.toastController.create({ message: 'No se pudo verificar las actualizaciones', duration: 5000 });
	      	return await toast.present();
	      }
	      if (check == true) {
			let alert = await this.alertController.create({
				header: 'Actualización disponible',
				message: 'Se ah encontrado una nueva actualización, pulsa "Actualizar" para descargar la ultima versión. Tienes "'+oldVersion+'", disponible "'+lastVersion+'".',
				buttons: [{ text: 'Cancelar', role: 'cancel' }, {
					text: 'Actualizar',
					handler: async()=>{
						await Browser.open({
							url: lastUrl,
							windowName: '_blank',
							toolbarColor: '#FF5733',
							presentationStyle: 'popover'
						});
					}
				}]
			});
			return await alert.present();
	      } else {
	      	if (consult == true) {
				await Toast.show({
					text: 'No se han encontrado actualizaciones.',
					duration: 'short',
					position: 'bottom'
				});
	      	}
	      }
	    });
	}
}