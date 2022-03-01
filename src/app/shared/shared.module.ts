import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { BookCardComponent } from './components/book-card/book-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { TraslatePaginator } from "./components/paginator/traslate-paginator";
import { ImagePipe } from './pipes/image.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';


@NgModule({
  declarations: [
    BookCardComponent,
    FooterComponent,
    ImagePipe,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    BookCardComponent,
    FooterComponent,
    ImagePipe,
    PaginatorComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: TraslatePaginator
    }
  ]
})
export class SharedModule { }
