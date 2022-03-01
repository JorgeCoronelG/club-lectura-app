import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SwiperModule } from "swiper/angular";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { BookSwiperComponent } from './components/book-swiper/book-swiper.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { IndexComponent } from './pages/index/index.component';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';


@NgModule({
  declarations: [
    PortalComponent,
    IndexComponent,
    BookSwiperComponent,
    BookDetailComponent,
    BookListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    FlexLayoutModule,
    MaterialModule,
    PortalRoutingModule,
    SharedModule
  ]
})
export class PortalModule { }
