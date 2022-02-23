import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../core/material/material.module";
import { BookCardComponent } from './components/book-card/book-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImagePipe } from './pipes/image.pipe';


@NgModule({
  declarations: [
    BookCardComponent,
    FooterComponent,
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
    ImagePipe
  ]
})
export class SharedModule { }
