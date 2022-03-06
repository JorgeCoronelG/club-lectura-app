import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { BookCardComponent } from './components/book-card/book-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TraslatePaginator } from "./components/paginator/traslate-paginator";
import { CompleteNamePipe } from './pipes/complete-name.pipe';
import { ImagePipe } from './pipes/image.pipe';


@NgModule({
  declarations: [
    BookCardComponent,
    FooterComponent,
    PaginatorComponent,
    CompleteNamePipe,
    ImagePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    BookCardComponent,
    FooterComponent,
    PaginatorComponent,
    CompleteNamePipe,
    ImagePipe
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: TraslatePaginator
    }
  ]
})
export class SharedModule { }
