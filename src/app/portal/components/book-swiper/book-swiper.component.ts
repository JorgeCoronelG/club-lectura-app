import { Component, Input, EventEmitter, Output } from '@angular/core';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from "swiper";
import { BookPortalModel } from "../../models/book-portal.model";

@Component({
  selector: 'app-book-swiper',
  templateUrl: './book-swiper.component.html',
  styleUrls: ['./book-swiper.component.scss']
})
export class BookSwiperComponent {
  @Input()
  public books: BookPortalModel[] = [];
  @Output()
  public onItemClicked: EventEmitter<number> = new EventEmitter<number>();

  public config: SwiperOptions;

  constructor() {
    SwiperCore.use([Pagination, Navigation]);

    this.config = {
      slidesPerView: 1,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        clickable: true
      },
      navigation: true,
      breakpoints: {
        '640': {
          slidesPerView: 1,
          spaceBetween: 5
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 5
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 5
        },
        '1280': {
          slidesPerView: 4,
          spaceBetween: 5
        },
        '1920': {
          slidesPerView: 5,
          spaceBetween: 5
        }
      }
    };
  }
}
