import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { SwiperModule } from "swiper/angular";
import { MaterialModule } from "../core/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { BookSwiperComponent } from './components/book-swiper/book-swiper.component';
import { IndexComponent } from './pages/index/index.component';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';


@NgModule({
  declarations: [
    PortalComponent,
    IndexComponent,
    BookSwiperComponent,
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    FlexLayoutModule,
    MaterialModule,
    PortalRoutingModule,
    SharedModule
  ]
})
export class PortalModule { }
