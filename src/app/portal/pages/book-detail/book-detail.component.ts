import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BookPortalModel } from "../../models/book-portal.model";
import { BookPortalService } from "../../services/book-portal.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  public book?: BookPortalModel;
  public authorMessageMapping: { [k: string]: string } = { '=1': 'Autor:', 'other': 'Autores:' };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private bookPortalService: BookPortalService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.findBookById(id);
    });
  }

  public redirect(): void {
    this.router.navigateByUrl('/portal');
  }

  private findBookById(id: number): void {
    this.bookPortalService.findById(id).subscribe(book => {
      this.book = book;
    });
  }
}
