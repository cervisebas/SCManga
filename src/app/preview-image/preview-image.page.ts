import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.page.html',
  styleUrls: ['./preview-image.page.scss'],
})
export class PreviewImagePage implements OnInit {
  constructor(public modalController: ModalController) { }
  @ViewChild(IonSlides) slides: IonSlides;
  @Input() img: string;
  //public sliderOpts = { zoom: true, passiveListeners: false };
  public sliderOpts = { zoom: { maxRatio: 5 }, passiveListeners: false, direction: 'vertical', observer: true, observeParents: true, on: {beforeInit() {const swiper = this; swiper.classNames.push(`${swiper.params.containerModifierClass}fade`); const overwriteParams = {slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: true, spaceBetween: 0, virtualTranslate: true, }; swiper.params = Object.assign(swiper.params, overwriteParams); swiper.params = Object.assign(swiper.originalParams, overwriteParams); }, setTranslate() {const swiper = this; const { slides } = swiper; for (let i = 0; i < slides.length; i += 1) {const $slideEl = swiper.slides.eq(i); const offset$$1 = $slideEl[0].swiperSlideOffset; let tx = -offset$$1; if (!swiper.params.virtualTranslate) tx -= swiper.translate; let ty = 0; if (!swiper.isHorizontal()) {ty = tx; tx = 0; } const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0); $slideEl .css({opacity: slideOpacity, }) .transform(`translate3d(${tx}px, ${ty}px, 0px)`); } }, setTransition(duration) {const swiper = this; const { slides, $wrapperEl } = swiper; slides.transition(duration); if (swiper.params.virtualTranslate && duration !== 0) {let eventTriggered = false; slides.transitionEnd(() => {if (eventTriggered) return; if (!swiper || swiper.destroyed) return; eventTriggered = true; swiper.animating = false; const triggerEvents = ['webkitTransitionEnd', 'transitionend']; for (let i = 0; i < triggerEvents.length; i += 1) {$wrapperEl.trigger(triggerEvents[i]); } }); } }, } }
  
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.slides.update();
  }
  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    zoomIn ? zoom.in() : zoom.out();
  }
  async close() {
    return await this.modalController.dismiss();
  }
}
