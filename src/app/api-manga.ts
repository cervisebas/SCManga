import { Component, Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import * as $ from 'jquery';

@Injectable()
export class ApiManga {
	constructor(
		public http: HTTP
	) {  }

	public urls: string[] = [
		'https://lectortmo.com/'
	];

	getRecents(newsMangasResult, newsAddsResult) {
		this.http.get(this.urls[0], {}, {}).then((html)=>{
			let htmlMangas = html.data.split('<div class="row">');
			let newsMangas = htmlMangas[21].split('<div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-2 upload-file-row"');
			let mangas = [];
			$.each(newsMangas.slice(1, newsMangas.length + 1), (index, val)=>{
				let temp1 = val.slice(val.indexOf(`background-image: url('`) + `background-image: url('`.length, val.indexOf(`');`, val.indexOf(`background-image: url('`)));
				let temp2 = val.slice(val.indexOf(`<h4 class="text-truncate">`) + `<h4 class="text-truncate">`.length, val.indexOf(`</h4>`, val.indexOf(`<h4 class="text-truncate">`)));
				let temp3 = val.slice(val.indexOf(`<div class="chapter-number">`) + `<div class="chapter-number">`.length, val.indexOf(`</div>`, val.indexOf(`<div class="chapter-number">`)));
				let temp4 = temp3.slice(temp3.indexOf(`<span class="number">`) + `<span class="number">`.length, temp3.indexOf(`</span>`, temp3.indexOf(`<span class="number">`)));
				if (temp4.indexOf('/one_shot/') !== -1) { temp4 = '0'; }
				let temp5 = val.slice(val.indexOf(`<a href="`) + `<a href="`.length, val.indexOf(`">`, val.indexOf(`<a href="`)));
				let temp6 = val.slice(val.indexOf(`<span class="book-type badge`) + `<span class="book-type badge`.length, val.indexOf(`</span>`, val.indexOf(`<span class="book-type badge`)));
				let temp7 = temp6.slice(temp6.indexOf(`">`) + `">`.length, temp6.length);
				mangas.push({ img: temp1, name: temp2, chapter: 'Capitulo '+temp4, url: temp5, type: temp7 });
			});
			newsMangasResult(mangas);

			let newsAdds = htmlMangas[19].split('<div class="element  col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-2 "');
			let adds = [];
			$.each(newsAdds.slice(1, newsAdds.length + 1), (index, val)=>{
				let temp1 = val.slice(val.indexOf(`<a href=" `) + `<a href=" `.length, val.indexOf(`">`, val.indexOf(`<a href=" `)));
				let temp2 = val.slice(val.indexOf(`background-image: url('`) + `background-image: url('`.length, val.indexOf(`');`, val.indexOf(`background-image: url('`)));
				let temp3 = val.slice(val.indexOf(`<span class="book-type badge`) + `<span class="book-type badge`.length, val.indexOf(`</span>`, val.indexOf(`<span class="book-type badge`)));
				let temp4 = temp3.slice(temp3.indexOf(`">`) + `">`.length, temp3.length);
				let temp5 = val.slice(val.indexOf(`<h4 class="text-truncate`) + `<h4 class="text-truncate`.length, val.indexOf(`</h4>`, val.indexOf(`<h4 class="text-truncate`)));
				let temp6 = temp5.slice(temp5.indexOf(`">`) + `">`.length, temp5.length);
				adds.push({ url: temp1, img: temp2, type: temp4, name: temp6 });
			});
			newsAddsResult(adds);
		}).catch((err)=>{
			newsMangasResult(false);
			newsAddsResult(false);
			console.log(err);
		});
	}
	getInfoManga(urlManga, result) {
		this.http.get(urlManga, {}, {}).then((html)=>{
			let section1 = html.data.slice(html.data.indexOf(`<section class="element-header-content">`) + `<section class="element-header-content">`.length, html.data.indexOf(`</section>\n<section class="element-header-bar">`, html.data.indexOf(`<section class="element-header-content">`)));
			let temp1 = section1.slice(section1.indexOf(`<h1 class="element-title my-2">`) + `<h1 class="element-title my-2">`.length, section1.indexOf(`<small`, section1.indexOf(`<h1 class="element-title my-2">`)));
			if (temp1.indexOf(`</h1>`) !== -1) { temp1 = temp1.slice(0, temp1.indexOf(`</h1>`, 0)); }
			let temp2 = section1.slice(section1.indexOf(`<small class="text-muted">`) + `<small class="text-muted">`.length, section1.indexOf(`</small>`, section1.indexOf(`<small class="text-muted">`)));
			if (temp2.indexOf(`</div>`) !== -1) { temp2 = 'Sin-información'; }
			let temp3 = section1.slice(section1.indexOf(`<p class="element-description">`) + `<p class="element-description">`.length, section1.indexOf(`</p>`, section1.indexOf(`<p class="element-description">`)));
			let temp4 = section1.split(`<h6 style="display: inline-block;"><a class="badge badge-primary py-2 px-4 mx-1 my-2"`);
			let temp5 = [];
			$.each(temp4.slice(1, temp4.length + 1), (index, val)=>{
				let tempGender1 = val.slice(val.indexOf(`">`) + `">`.length, val.indexOf(`</a></h6>`, val.indexOf(`">`)));
				let tempGender2 = val.slice(val.indexOf(`href="`) + `href="`.length, val.indexOf(`">`, val.indexOf(`href="`)));
				temp5.push({ name: tempGender1, url: tempGender2 });
			});
			let temp6 = section1.slice(section1.indexOf(`<h1 class="book-type `) + `<h1 class="book-type `.length, section1.indexOf(`</h1>`, section1.indexOf(`<h1 class="book-type `)));
			let temp7 = temp6.slice(temp6.indexOf(`">`) + `">`.length, temp6.length);
			let temp8 = section1.slice(section1.indexOf(`<img class="book-thumbnail`) + `<img class="book-thumbnail`.length, section1.indexOf(`.jpg`, section1.indexOf(`<img class="book-thumbnail`)));
			let temp9 = temp8.slice(temp8.indexOf(`src="`) + `src="`.length, temp8.length);
			this.getAllChapters(html.data, (chapters)=>{
				result({ name: temp1.replace(/\n/gi, ''), age: temp2.replace(/ /gi, '').replace(/\(/gi, '').replace(/\)/gi, ''), synopsis: temp3, genders: temp5, type: temp7, img: temp9+'.jpg', chapters: chapters });
			});
		}).catch((err)=>{
			result(false);
			console.log(err);
		});
	}
	getAllChapters(html, result) {
		if (html.indexOf(`<div class="card chapters" id="chapters">`) !== -1) {
			let list = html.split(`<li class="list-group-item p-0 bg-light upload-link"`);
			let temp0 = [];
			$.each(list.slice(1, list.length + 1), (index, val)=>{
				let temp1 = val.slice(val.indexOf(`<i class="fa fa-chevron-down fa-fw"></i>`) + `<i class="fa fa-chevron-down fa-fw"></i>`.length, val.indexOf(`</a>`, val.indexOf(`<i class="fa fa-chevron-down fa-fw"></i>`)));
				let temp2 = val.slice(val.indexOf(`<ul class="list-group list-group-flush chapter-list">`) + `<ul class="list-group list-group-flush chapter-list">`.length, val.indexOf(`</ul>`, val.indexOf(`<ul class="list-group list-group-flush chapter-list">`)));
				let temp3 = temp2.split(`<li class="list-group-item">`);
				let temp4 = [];
				$.each(temp3.slice(1, temp3.length + 1), (index2, val2)=>{
					let temp5 = val2.slice(val2.indexOf(`<a href="`) + `<a href="`.length, val2.indexOf(`</a>`, val2.indexOf(`<a href="`)));
					let temp6 = temp5.slice(temp5.indexOf(`">`) + `">`.length, temp5.length);
					let temp7 = val2.split(`<a href="`);
					let temp8 = '';
					$.each(temp7.slice(1, temp7.length + 1), (index3, val3)=>{ if (val3.indexOf('view_uploads') !== -1) { temp8 = val3.slice(0, val3.indexOf(`" class="`, 0)); } });
					temp4.push({ name: temp6, url: temp8 });
				});
				temp0.push({ name: temp1.slice(1, temp1.length).replace(/\&nbsp;/gi, ' '), servers: temp4 });
			});
			result(temp0);
		} else {
			let list = html.slice(html.indexOf(`<ul class="list-group list-group-flush chapter-list">`) + `<ul class="list-group list-group-flush chapter-list">`.length, html.indexOf(`</ul>`, html.indexOf(`<ul class="list-group list-group-flush chapter-list">`)));
			let temp1 = list.slice(list.indexOf(`<a href="`) + `<a href="`.length, list.indexOf(`" class="`, list.indexOf(`<a href="`)));
			let temp2 = list.slice(list.indexOf(`<span class="">\n`) + `<span class="">\n`.length, list.indexOf(`\n</span>`, list.indexOf(`<span class="">\n`)));
			let temp3 = []; temp3.push({ name: temp2, url: temp1 });
			result([{ name: 'Capitulo 0', servers: temp3 }]);
		}
	}
	getImagesChapters(urlChapters, result) {
		this.http.get(urlChapters, {}, {}).then((html)=>{
			this.http.get(html.url.replace(/paginated/gi, 'cascade'), {}, {}).then((html)=>{
				let images = html.data.split(`<div class="img-container text-center">`);
				let lists = [];
				$.each(images.slice(1, images.length + 1), (index, val)=>{
					let temp1 = val.slice(val.indexOf(`data-src="`) + `data-src="`.length, val.indexOf(`" class="viewer-img"`, val.indexOf(`data-src="`)));
					lists.push(temp1.replace('japanreader.com', 'recipesandcook.com'));
				});
				result(lists);
			}).catch((err)=>{ result(false); console.log(err); });
		}).catch((err)=>{ result(false); console.log(err); });
	}
	getSearch(page, search, result) {
		let urlSearch = 'https://lectortmo.com/library?_pg=1&title='+search.replace(/\ /gi, '+')+'&page='+page;
		this.http.get(urlSearch, {}, {}).then((html)=>{
			let list = (html.data.split(`<div class="row">`)[4]).split(`<div class="element  col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-2`);
			let temp0 = [];
			$.each(list.slice(1, list.length + 1), (index, val)=>{
				let temp1 = val.slice(val.indexOf(`<a href="`) + `<a href="`.length, val.indexOf(`">`, val.indexOf(`<a href="`)));
				let temp2 = val.slice(val.indexOf(`background-image: url('`) + `background-image: url('`.length, val.indexOf(`');`, val.indexOf(`background-image: url('`)));
				let temp3 = val.slice(val.indexOf(`<h4 class="text-truncate"`) + `<h4 class="text-truncate"`.length, val.indexOf(`</h4>`, val.indexOf(`<h4 class="text-truncate"`)));
				let temp4 = temp3.slice(temp3.indexOf(`">`) + `">`.length, temp3.length);
				let temp5 = val.slice(val.indexOf(`<span class="book-type badge`) + `<span class="book-type badge`.length, val.indexOf(`</span>`, val.indexOf(`<span class="book-type badge`)));
				let temp6 = temp5.slice(temp5.indexOf(`">`) + `">`.length, temp5.length);
				temp0.push({ url: temp1.replace(/\ /gi, ''), img: temp2.replace(/\ /gi, ''), name: temp4, type: temp6 });
			});
			result(temp0);
		}).catch((err)=>{
			result(false);
			console.log(err);
		});
	}
	addFavorite(info) {
		if (localStorage.getItem('ListFavorites') !== null) {
			let list = $.parseJSON(localStorage.getItem('ListFavorites'));
			list = list.concat(info);
			localStorage.setItem('ListFavorites', JSON.stringify(list));
		} else {
			let list = [];
			list = list.concat(info);
			localStorage.setItem('ListFavorites', JSON.stringify(list));
		}
		return true;
	}
	removeFavorite(url) {
		if (localStorage.getItem("ListFavorites") === null) { return false; }
		let arregloList = [];
		arregloList = arregloList.concat(JSON.parse(localStorage.getItem("ListFavorites")));
		arregloList.find((element, index)=>{
			if (element["url"] === url) {
				arregloList.splice(index, 1);
				localStorage.setItem("ListFavorites", JSON.stringify(arregloList));
				return true;
			}
		});
	}
	checkFavorite(url) {
		if (localStorage.getItem('ListFavorites') !== null) {
			let list = $.parseJSON(localStorage.getItem('ListFavorites'));
			let encontrado = false;
			$.each(list, (index, val)=>{ if (String(val.url) == String(url)) { encontrado = true; } });
			return encontrado;
		} else {
			return false;
		}
	}
	getFavorites() {
		if (localStorage.getItem('ListFavorites') !== null) {
			if (JSON.parse(localStorage.getItem('ListFavorites')).length !== 0) {
				return JSON.parse(localStorage.getItem('ListFavorites'));
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}