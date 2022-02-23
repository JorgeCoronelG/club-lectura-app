import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BookPortalModel } from "../../models/book-portal.model";
import { BookPortalService } from "../../services/book-portal.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  public latestBooks: BookPortalModel[] = [];
  public mostReadBooks: BookPortalModel[] = [];

  constructor(private bookPortalService: BookPortalService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.bookPortalService.findAllIndex().subscribe(([latestBooks, mostReadBooks]) => {
      this.latestBooks = latestBooks;
      this.mostReadBooks = mostReadBooks;
      if (latestBooks.length === 0) {
        this.toastr.info('No hay libros en novedades.', 'Información');
      }
      if (mostReadBooks.length === 0) {
        this.toastr.info('No hay libros en más leídos.', 'Información');
      }
    });
  }

  public showBook(id: number): void {
    this.router.navigate(['/portal/libro', id]);
  }
}
